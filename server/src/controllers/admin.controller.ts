import { Request, Response } from "express";
import BookRepo from "../dbrepo/book.repo.js";
import UserRepo from "../dbrepo/user.repo.js";

class AdminController {
    private useRepo: UserRepo
    private bookRepo: BookRepo
    constructor(userRepo: UserRepo, bookRepo: BookRepo){
        this.useRepo = userRepo;
        this.bookRepo = bookRepo;
    }

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