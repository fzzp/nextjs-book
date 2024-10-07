import { Request, Response } from "express";
import BookRepo from "../dbrepo/book.repo.js";
import Book from "../models/book.js";
import { bookNotExists, clientError, serverError, succResponse } from "./helper.js";
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
           let list = this.bookRepo.getAll() as Book[] || []
            res.status(200).json(succResponse(list))
        } catch (error) {
            console.error("获取所有图书失败：", error)
            res.status(500).json(serverError);
        }
    }

    async searchBooksHandler(req: Request, res: Response) {
        try {
           let keyword = req.query.keyword as string
           let list = this.bookRepo.queryByKeyword(keyword) as Book[] || []
           res.status(200).json(succResponse(list))
        } catch (error) {
            console.error("查找图书失败：", error)
            res.status(500).json(serverError);
        }
    }

    async getBookHandler(req: Request, res: Response) {
        try {
            let bookid = req.params.bookid
            if (Number(bookid) <= 0) {
                res.status(400).json(bookNotExists)
                return
            }

            let book = this.bookRepo.get(Number(bookid)) as Book
            if (!book) {
                res.status(400).json(bookNotExists)
                return
            }
            res.status(200).json(succResponse(book))
        } catch (error) {
            console.error("获取图书详情失败：", error)
            res.status(500).json(serverError);
        }
    }

}

export default BookController