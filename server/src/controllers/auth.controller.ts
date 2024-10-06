import { Request, Response } from "express";
class AuthController {
    constructor(){}

    async signUpHandler(req: Request, res: Response) {
        try {
            res.json({path: req.url})
        } catch (error) {
            
        }
    }

    async loginHandler(req: Request, res: Response) {
        try {
            res.json({path: req.url})
        } catch (error) {
            
        }
    }

    async getProfileHandler(req: Request, res: Response) {
        try {
            res.json({path: req.url})
        } catch (error) {
            
        }
    }

    async updateMeHandler(req: Request, res: Response) {
        try {
            res.json({path: req.url})
        } catch (error) {
            
        }
    }

}

export default AuthController