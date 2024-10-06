import { Request, Response } from "express";
import UserRepo from "../dbrepo/user.repo.js";
import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { errorReponse, succResponse, serverError, clientError } from "./helper.js"

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

    async signUpHandler(req: Request, res: Response) {
        console.log("userRepo: ", this)

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
            if(String(error).includes("UNIQUE constraint failed: users.email")) {
                res.status(400).json(clientError("邮箱已注册"));
                return
            }

            res.status(500).json(serverError);
        }
    }

    async loginHandler(req: Request, res: Response) {
        try {
            res.json({ path: req.url })
        } catch (error) {

        }
    }

    async getProfileHandler(req: Request, res: Response) {
        try {
            res.json({ path: req.url })
        } catch (error) {

        }
    }

    async updateMeHandler(req: Request, res: Response) {
        try {
            res.json({ path: req.url })
        } catch (error) {

        }
    }

}

export default AuthController