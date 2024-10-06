import { Request, Response } from "express";
import BookRepo from "../dbrepo/book.repo.js";
class BookController {
    private bookRepo: BookRepo
    constructor(repo: BookRepo){
        this.bookRepo = repo
    }

    async listBooksHandler(req: Request, res: Response) {
        try {
            res.json({path: req.url})
        } catch (error) {
            
        }
    }

    async searchBooksHandler(req: Request, res: Response) {
        try {
            res.json({path: req.url})
        } catch (error) {
            
        }
    }

    async getBookHandler(req: Request, res: Response) {
        try {
            res.json({path: req.url})
        } catch (error) {
            
        }
    }

}

export default BookController