import { Request, Response, NextFunction } from "express";
import { serverError, clientError } from "../controllers/helper.js";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requiredAuth = async (req: Request & { userId: number }, res: Response, next: NextFunction) => {
    try {
        // 从header取jwt
        let tokenString = req.headers.authorization || ""

        if (!tokenString) {
            res.status(401).json(clientError("请选登陆"));
            return
        }

        // 拆分token
        let fileds = tokenString.split(" ")
        if (fileds.length != 2) {
            res.status(401).json(clientError("token 格式错误"));
            return
        }

        // 全部转换成小写
        let bearer = fileds[0].toLowerCase()
        if (!bearer.startsWith("bearer")) {
            res.status(401).json(clientError("token 类型错误"))
            return
        }

        let accessToekn = fileds[1].trim()
        if (!accessToekn) {
            res.status(401).json(clientError("请选登陆"))
            return
        }

        const payload: any = jwt.verify(accessToekn, process.env.JWT_SECRET);

        if (!payload || !payload?.userId) {
            res.status(401).json(clientError("token 无效"));
            return
        }

        req.userId = payload.userId

        next()

    } catch (error) {
        // 这里需要更详细地判断 jwt 错误，如：
        // JsonWebTokenError: jwt malformed      格式错误
        // JsonWebTokenError: invalid signature  签名错误，其实是密钥不对
        // JsonWebTokenError: invalid token      令牌无效 
        if (String(error).includes("JsonWebTokenError: jwt malformed")) {
            res.status(401).json(clientError("token 格式错误"));
            return
        }

        if (String(error).includes("JsonWebTokenError: invalid signature")) {
            res.status(401).json(clientError("token 无效"));
            return
        }

        if (String(error).includes("JsonWebTokenError: invalid token")) {
            res.status(401).json(clientError("token 无效"));
            return
        }

        console.error("获取令牌 error: ", error)
        res.status(500).json(serverError);
    }
}


// 管理员角色控制
export const requiredAdminRole = async (req: Request & { user: User }, res: Response, next: NextFunction) => {
    try {
        let user = req.user
        if (!user) {
            res.status(500).json(serverError);
            return
        }

        if (user.role != 1) {
            res.status(403).json(clientError("禁止访问"));
            return
        }

        next()
    } catch (error) {
        console.error("管理员角色认证失败：", error)
        res.status(500).json(serverError);
    }
}