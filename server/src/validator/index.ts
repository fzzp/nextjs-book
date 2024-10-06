export class Validator {
    private errors: { [propName: string]: string } // 收集错误
    constructor() {
        this.errors = {}
    }

    // 验证是否有错误
    valid(): boolean {
        return Object.keys(this.errors).length === 0
    }

    // 添加错误
    addError(key: string, message: string) {
        this.errors[key] = message
    }

    // 表达式expr为false，则添加错误，expr 按正常逻辑写即可，如：price 必须大于0，expr = price > 0
    checkField(expr: boolean, key: string, message: string) {
        if (!expr) {
            this.errors[key] = message
        }
    }
}


// 验证辅助函数

const emailRx = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)

// 非空校验
export function notBlank(value: string): boolean {
    return value.trim() != ""
}

// 最小长度
export function minValLen(value: string, n: number): boolean {
    return value.trim().length >= n
}

// 最大长度
export function maxValLen(value: string, n: number): boolean {
    return value.trim().length <= n
}

// 邮箱验证
export function checkEmail(email: string) {
    let s = email.toLocaleLowerCase()
    emailRx.lastIndex = 0; // 先复位
    return emailRx.test(s)
}