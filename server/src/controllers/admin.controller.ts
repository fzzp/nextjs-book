import { Request, Response } from "express";
class AdminController {
    constructor(){}

    async createBookHandler(req: Request, res: Response) {
        try {
            res.json({path: req.url})
        } catch (error) {
            
        }
    }

    async updateBookHandler(req: Request, res: Response) {
        try {
            res.json({path: req.url})
        } catch (error) {
            
        }
    }

    async delBookHandler(req: Request, res: Response) {
        try {
            res.json({path: req.url})
        } catch (error) {
            
        }
    }
}

export default AdminController