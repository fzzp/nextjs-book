// import bcrypt from "bcryptjs";
import { Validator, checkEmail, minValLen, maxValLen, notBlank } from "../validator/index.js";


// type User = {
//     id: number;
//     email: string;
//     password: string;
//     username: string;
//     avatar: string;
//     role: number;
//     created_at: string;
//     updated_at: string;
// }


// 这里还是使用类来做类型吧


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
        // this.hashedPswd(password);
    }

    // 这里加密的话，不要做校验
    // async hashedPswd(password: string) {
    //     const salt = await bcrypt.genSalt(10);
	// 	this.password = await bcrypt.hash(password, salt) as string;
    // }

    checkUser() {
        const validator = new Validator()
        validator.checkField(notBlank(this.email), "email", "邮箱地址不能为空")
        validator.checkField(checkEmail(this.email), "email", "邮箱地址不正确")

        validator.checkField(notBlank(this.username), "username", "用户名不能为空")
        validator.checkField(minValLen(this.username, 2), "username", "用户名长度至少2位")
        validator.checkField(maxValLen(this.username, 16), "username", "用户名长度最大16位")

        validator.checkField(notBlank(this.password), "password", "密码不能为空")
        validator.checkField(minValLen(this.password, 6), "password", "密码长度至少6位")
        validator.checkField(maxValLen(this.password, 16), "password", "密码长度最大16位")

        return validator
    }
}


export default User

