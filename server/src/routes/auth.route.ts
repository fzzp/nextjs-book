import express from "express";
import AuthController from "../controllers/auth.controller.js";

const auth = new AuthController()

// 使用子路由
const router = express.Router();

// 用户注册
router.post("/signup", auth.signUpHandler)

// 用户登陆
router.post("/login", auth.loginHandler)

// 获取个人信息
router.get("/profile", auth.getProfileHandler)

// 更新个人信息
router.get("/update", auth.updateMeHandler)


export default router
