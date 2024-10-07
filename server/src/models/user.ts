import { Validator, checkEmail, minValLen, maxValLen, notBlank } from "../validator/index.js";

class User {
    id: number;
    email: string;
    password: string;
    username: string;
    avatar: string;
    role: number;
    created_at: string;
    updated_at: string;
    constructor(email: string, username: string, password: string) {
        this.email = email.toLowerCase(); // 全部转换成小写
        this.username = username;
        this.password = password;
    }

    checkEmail(validator: Validator) {
        validator.checkField(notBlank(this.email), "email", "邮箱地址不能为空")
        validator.checkField(checkEmail(this.email), "email", "邮箱地址不正确")
    }

    checkPassword(validator: Validator) {
        validator.checkField(notBlank(this.password), "password", "密码不能为空")
        validator.checkField(minValLen(this.password, 6), "password", "密码长度至少6位")
        validator.checkField(maxValLen(this.password, 16), "password", "密码长度最大16位")
    }

    checkUserName(validator: Validator) {
        validator.checkField(notBlank(this.username), "username", "用户名不能为空")
        validator.checkField(minValLen(this.username, 2), "username", "用户名长度至少2位")
        validator.checkField(maxValLen(this.username, 16), "username", "用户名长度最大16位")
    }

    checkUser() {
        const validator = new Validator()

        this.checkEmail(validator)
        this.checkUserName(validator)
        this.checkPassword(validator)

        return validator
    }
}


export default User

