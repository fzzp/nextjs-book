import { Request, Response } from "express";
import UserRepo from "../dbrepo/user.repo.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { 
    errorReponse, 
    succResponse, 
    serverError, 
    clientError,
    genToken
} from "./helper.js"
import { Validator } from "../validator/index.js";

class AuthController {
    private userRepo: UserRepo
    constructor(repo: UserRepo) {
        this.userRepo = repo

        // 绑定this
        this.signUpHandler = this.signUpHandler.bind(this)
        this.loginHandler = this.loginHandler.bind(this)
        this.getProfileHandler = this.getProfileHandler.bind(this)
        this.updateMeHandler = this.updateMeHandler.bind(this)
    }

    // 注册
    async signUpHandler(req: Request, res: Response) {
        try {
            const { username = "", email = "", password = "" } = req.body
            const user = new User(email, username, password)
            const validator = user.checkUser()
            if (!validator.valid()) {
                res.status(400).json(errorReponse(validator));
                return
            }

            const salt = await bcrypt.genSalt(10);
            let hashedPsed = await bcrypt.hash(password, salt)
            user.password = hashedPsed

            // 执行注册逻辑
            let newID = this.userRepo.insert(user)

            res.status(200).json(succResponse(newID))

        } catch (error) {
            console.error("注册失败：", error)
            if (String(error).includes("UNIQUE constraint failed: users.email")) {
                res.status(400).json(clientError("邮箱已注册"));
                return
            }

            res.status(500).json(serverError);
        }
    }

    // 登陆
    async loginHandler(req: Request, res: Response) {
        try {
            const { email = "", password = "" } = req.body

            const validator = new Validator()
            const user = new User(email, "", password)
            user.checkEmail(validator)
            user.checkPassword(validator)

            if (!validator.valid()) {
                res.status(400).json(errorReponse(validator))
                return
            }

            const dbUser = this.userRepo.getByEmail(email) as User

            const isMatch = await bcrypt.compare(password, dbUser?.password || "");

            if (!dbUser || !isMatch) {
                res.status(400).json(clientError("账号或密码不匹配"));
                return
            }

            delete dbUser.password

            // 生成token
            let token = genToken(dbUser.id)
            let response = {
                ...dbUser,
                token
            }

            res.status(200).json(succResponse(response));

        } catch (error) {
            console.error("登陆失败：", error)
            res.status(500).json(serverError);
        }
    }

    // 获取个人信息
    async getProfileHandler(req: Request & {user: User}, res: Response) {
        try {
            let user = req.user
            if(user) {
                res.status(200).json(user)
            }else{
                res.status(500).json(serverError)
            }
        } catch (error) {
            console.log("获取个人信息 error: ", error)
            res.status(500).json(serverError)
        }
    }

    // 更新个人信息
    async updateMeHandler(req: Request & {user: User}, res: Response) {
        try {
            const { username = "", avatar = "" } = req.body

            let user = req.user
            
            if(!user || !user.id) {
                res.status(400).json(clientError("用户不存在"));
                return
            }
            if (String(username).trim()) {
                user.username = username.trim()
            }
            if (String(avatar).trim()) {
                user.avatar = avatar.trim()
            }
           let ok = this.userRepo.update(user)
           if (ok ){
                res.status(200).json(succResponse(true))
           }else { // 按理不会走到这里，预防代码
                res.status(400).json(clientError("用户不存在"))
           }
        } catch (error) {
            console.error("更新用户个人信息失败：", error)
            res.status(500).json(serverError);
        }
    }
}

export default AuthController