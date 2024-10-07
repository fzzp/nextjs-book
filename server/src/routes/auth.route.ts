import express from "express";
import AuthController from "../controllers/auth.controller.js";
import UserRepo from "../dbrepo/user.repo.js";
import { setUser } from "../middleware/context.js";
import { requiredAuth } from "../middleware/requiredAuth.js";

function authRouter(userRepo: UserRepo) {
    const auth = new AuthController(userRepo)

    // 使用子路由
    const router = express.Router();

    // 用户注册
    router.post("/signup", auth.signUpHandler)

    // 用户登陆
    router.post("/login", auth.loginHandler)

    // 下面将登陆认证和获取个人信息分开为两个中间件，更加灵活

    // 获取个人信息
    router.get("/profile", requiredAuth, setUser, auth.getProfileHandler)

    // 更新个人信息
    router.post("/update", requiredAuth, setUser, auth.updateMeHandler)

    return router
}

export default authRouter
