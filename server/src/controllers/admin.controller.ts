import { Request, Response } from "express";
import BookRepo from "../dbrepo/book.repo.js";
import Book from "../models/book.js";
import { clientError, errorReponse, serverError, succResponse } from "./helper.js";

class AdminController {
    private bookRepo: BookRepo
    constructor(bookRepo: BookRepo) {
        this.bookRepo = bookRepo;

        // 绑定this
        this.createBookHandler = this.createBookHandler.bind(this)
        this.updateBookHandler = this.updateBookHandler.bind(this)
        this.delBookHandler = this.delBookHandler.bind(this)
    }

    async createBookHandler(req: Request, res: Response) {
        try {
            let item = bindBookWithCheck(req, res)
            if (!item) { return }
            let newId = this.bookRepo.insert(item)
            res.status(200).json(succResponse(newId))
        } catch (error) {
            console.error("添加图书失败：", error)
            res.status(500).json(serverError);
        }
    }

    async updateBookHandler(req: Request, res: Response) {
        try {
            let bookid = req.params.bookid

            if (Number(bookid) <= 0) {
                res.status(400).json(clientError("图书不存在"))
                return
            }

            let item = bindBookWithCheck(req, res)
            if (!item) { return }

            item.id = Number(bookid)

            let ok = this.bookRepo.update(item)
            if (ok) {
                res.status(200).json(succResponse(true))
            } else { // 按理不会走到这里，预防代码
                res.status(400).json(clientError("图书不存在"))
            }
        } catch (error) {
            console.error("更新图书失败：", error)
            res.status(500).json(serverError);
        }
    }

    async delBookHandler(req: Request, res: Response) {
        try {
            let bookid = req.params.bookid
            if (Number(bookid) <= 0) {
                res.status(400).json(clientError("图书不存在"))
                return
            }
            let ok = this.bookRepo.delete(Number(bookid))
            if (ok) {
                res.status(200).json(succResponse(true))
            } else { 
                res.status(400).json(clientError("图书不存在"))
            }
        } catch (error) {
            console.error("删除图书失败：", error)
            res.status(500).json(serverError);
        }
    }
}

// 从请求参数构建book实例，并校验
function bindBookWithCheck(req: Request, res: Response) {
    const {
        title = "",
        author = "",
        price = "",
        cover_pic = "",
        description = "",
    } = req.body

    const item = new Book(title, author, price, cover_pic, description)
    const validator = item.checkBook()
    if (!validator.valid()) {
        res.status(400).json(errorReponse(validator)).end()
        return false
    }

    return item
}

export default AdminController