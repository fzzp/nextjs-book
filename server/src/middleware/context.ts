import { Request, Response, NextFunction } from "express";
import { serverError, clientError } from "../controllers/helper.js";
import UserRepo from "../dbrepo/user.repo.js";
import User from "../models/user.js";

var userRepo: UserRepo = null

// 设置一个userRepo，提供给 context 使用
export function setRepoForMiddleware (repo: UserRepo ){
    userRepo = repo
}

// 设置用户信息到上下文
export const setUser = async (req: Request & {userId: number, user: User}, res: Response, next: NextFunction) => {
    try {
        let userId = req.userId
        const user = userRepo.getById(userId) as User
        if (!user || user.id <= 0) {
            res.status(401).json(clientError("用户不存在"))
            return
        }

        delete user.password
        
        req.user = user

        next()
    } catch (error) {
        console.error("设置用户 error: ", error)
        res.status(500).json(serverError);
    }
}