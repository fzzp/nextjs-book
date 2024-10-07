import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";

import adminRouter from "./routes/admin.route.js";
import authRouter from "./routes/auth.route.js";
import bookRouter from "./routes/book.route.js";
import openDb from "./dbrepo/db.js";
import UserRepo from "./dbrepo/user.repo.js";
import BookRepo from "./dbrepo/book.repo.js";
import ImageRepo from "./dbrepo/image.repo.js";
import { setRepoForMiddleware, setUser } from "./middleware/context.js";
import { requiredAdminRole, requiredAuth } from "./middleware/requiredAuth.js";
import { clientError, serverError } from "./controllers/helper.js";

import fs from "node:fs";
import { Buffer } from "node:buffer";
import { ImageModel, NewImageModel } from "./models/image.js";

// 加载 .env 环境变量
dotenv.config()

// 创建express实例
const app = express()

// 处理跨域
app.use(cors())

// ========== 使用中间解析基本数据 ========== //

// 解析 req.body 参数，并限制大小为5mb以内
app.use(express.json({ limit: "5mb" }))

// 解析表单数据
app.use(express.urlencoded({ extended: true }))

// 解析cookie
app.use(cookieParser())

// =============== 连接SQLite3 ================ //

// 连接SQLite3
const db = openDb(process.env.DB_SOURCE)

// 创建数据持久层
const userRepo = new UserRepo(db)
const bookRepo = new BookRepo(db)
const imageRepo = new ImageRepo(db)

// 设置 repo 提供 middleware 使用，或者重新创建repo实例也行
setRepoForMiddleware(userRepo)

// =============== 业务路由 ================ //

// 查看图书接口
app.use("/v1/books", bookRouter(bookRepo))

// 用户认证接口
app.use("/v1/auth", authRouter(userRepo))

// 管理员操作接口
app.use("/v1/admn", requiredAuth, setUser, requiredAdminRole, adminRouter(bookRepo))


// =============== 图片上传与访问 ================ //

// 上传文件，临时存放目录
const tempFileDir = process.env.TEMP_FILE_DIR || "./tmp"

// 使用中间件解析上传文件
app.use(fileUpload({
    limits: { fileSize: 4 * 1024 * 1024 }, // 限制最大4MB
    // 使用磁盘存储，而不是缓存在内存中
    useTempFiles: true,
    tempFileDir: tempFileDir
}));

// 上传单个文件到数据库
app.use("/api/uploadPic", requiredAuth, async (req: Request & { files: any }, res: Response) => {
    try {
        if (!req.files || !req.files.imageFile) {
            res.status(400).json(clientError("请选择上传的图片"));
            return
        }

        // 根据文件名获取文件
        let file = req.files.imageFile;

        // 如果是数组，则取最后一个
        if (Array.isArray(file)) {
            file = file.pop()
        }

        // console.log(file)

        // 不是图片不支持
        if(!(file.mimetype as string || "").startsWith("image/")) {
            res.status(400).json(clientError("仅支持上传图片"));
            return
        }

        // 从临时存放位置读取文件
        let buf = fs.readFileSync(file.tempFilePath)

        // let blod = Buffer.from(buf)

        // 创建 imageModel 对象
        let img = NewImageModel(buf)

        // 存储 img 和 blod 到数据库
        let newID = imageRepo.insert(img)

        // 插入数据成功
        if (newID > 0) {
            res.status(200).json({ id: newID, filename: img.filename })
            return
        }

        res.status(500).json(clientError("上传失败"))
    } catch (error) {
        console.error("上传失败: ", error)
        res.status(500).json(serverError)
    }
})

// 访问图片，返回 image base64
// 如：<img src="http://localhost:8901/show/pic/05ceeb03..." > 就可以直接显示图片了
app.use("/show/pic/:filename", async (req: Request, res: Response) => {
    let filename = req.params.filename
    let img = imageRepo.get(filename) as ImageModel
    if(!img || !img.id || !img.data) {
        res.status(404).end()
        return 
    }

    const pic = Buffer.from(img.data, "base64")
    
    // NOTE: 这里不需要再加头，Buffer.from 应该处理了，加了就显示不出来了
    // let result = "data:image/jpeg;base64, " + pic

    // 设置相应头为图片类型
    res.writeHead(200, {
        "Content-Type": "image/jpeg",
        "Content-Length": pic.length
    })

    // NOTE: 这里不能使用send，send是对非流响应执行的任务
    // res.send(pic)

    res.end(pic)
})


// =============== 启动服务 ================ //

const port = process.env.PORT || 8901;

app.listen(port, () => {
    console.log("server is running on port " + port)
})