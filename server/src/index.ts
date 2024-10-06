import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

// 加载 .env 配置环境变量
dotenv.config()

// 创建express实例
const app = express()

// ========== 使用中间解析基本数据 ========== //

// 解析 req.body 参数，并限制大小为5mb以内
app.use(express.json({limit: "5mb"}))

// 解析表单数据
app.use(express.urlencoded({extended: true}))

// 解析cookie
app.use(cookieParser())

// =============== 业务路由 ================ //

// 查看图书接口
app.use("/v1/books")

// 用户认证接口
app.use("/v1/auth")

// 管理员操作接口
app.use("/v1/admn")


// =============== 启动服务 ================ //

const port = process.env.PORT || 8901;

app.listen(port, () => {
    console.log("server is running on port " + port)
})