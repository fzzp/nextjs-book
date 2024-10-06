import express from "express";
import AuthController from "../controllers/auth.controller.js";
import UserRepo from "../dbrepo/user.repo.js";

function authRouter(userRepo: UserRepo) {
    const auth = new AuthController(userRepo)

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

    return router
}

export default authRouter
