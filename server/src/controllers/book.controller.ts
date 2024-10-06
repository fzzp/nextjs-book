import { Request, Response } from "express";
import BookRepo from "../dbrepo/book.repo.js";
class BookController {
    private bookRepo: BookRepo
    constructor(repo: BookRepo){
        this.bookRepo = repo

        // 绑定this
        this.listBooksHandler = this.listBooksHandler.bind(this)
        this.searchBooksHandler = this.searchBooksHandler.bind(this)
        this.getBookHandler = this.getBookHandler.bind(this)

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