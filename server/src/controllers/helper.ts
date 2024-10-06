import { Validator } from "../validator/index.js";


type JsonResponse = {
    data: any;
    error: string;
    errors?: {[propName: string]: string}
}

export const serverError: JsonResponse = {
    data: null,
    error: "服务内部错误，请稍后重试！"
}

export const errorReponse = (validator: Validator): JsonResponse => {
    return {
        data: null,
        error: validator.oneError(),
        errors: validator.errors()
    }
}

export const succResponse = (data: any, msg: string = "请求成功"): JsonResponse => {
    return {
        data: data,
        error: msg
    }
}