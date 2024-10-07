import { Validator } from "../validator/index.js";
import jwt from "jsonwebtoken";

type JsonResponse = {
    error: string;
    data?: any;
    errors?: {[propName: string]: string}
}

// 服务内部错误
export const serverError: JsonResponse = {
    error: "服务内部错误，请稍后重试！"
}

// 客户端错误
export const clientError = (error = "请求错误，请检查参数") => {
    return {
        error: error
    }
}

// 验证错误
export const errorReponse = (validator: Validator): JsonResponse => {
    return {
        error: validator.oneError(),
        errors: validator.errors()
    }
}

// 请求成功
export const succResponse = (data: any, msg: string = "请求成功"): JsonResponse => {
    return {
        data: data,
        error: msg
    }
}

// 生成jwt token，有效期7天
export function genToken(userId: number) {
    try {
        const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
            expiresIn: "7d", // 默认设置7天
        });
        return token
    } catch (error) {
        throw error
    }
}