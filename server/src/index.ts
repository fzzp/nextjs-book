import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import adminRouter from "./routes/admin.route.js";
import authRouter from "./routes/auth.route.js";
import bookRouter from "./routes/book.route.js";
import openDb from "./dbrepo/db.js";
import UserRepo from "./dbrepo/user.repo.js";
import BookRepo from "./dbrepo/book.repo.js";
import ImageRepo from "./dbrepo/image.repo.js";

// 加载 .env 配置环境变量
dotenv.config()

// 创建express实例
const app = express()

// ========== 使用中间解析基本数据 ========== //

// 解析 req.body 参数，并限制大小为5mb以内
app.use(express.json({ limit: "5mb" }))

// 解析表单数据
app.use(express.urlencoded({ extended: true }))

// 解析cookie
app.use(cookieParser())

// =============== 连接SQLite3 ================ //

// 连接SQLite3,并在db.ts设置全局的 Connect
const db = openDb(process.env.DB_SOURCE)

// 创建数据持久层
const userRepo = new UserRepo(db)
const bookRepo = new BookRepo(db)
const imageRepo = new ImageRepo(db)

// =============== 业务路由 ================ //

// 查看图书接口
app.use("/v1/books", bookRouter(bookRepo))

// 用户认证接口
app.use("/v1/auth", authRouter(userRepo))

// 管理员操作接口
app.use("/v1/admn", adminRouter(userRepo, bookRepo))


// =============== 启动服务 ================ //

const port = process.env.PORT || 8901;

app.listen(port, () => {
    console.log("server is running on port " + port)
})