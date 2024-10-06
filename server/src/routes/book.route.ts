import express from "express";
import BookController from "../controllers/book.controller.js";
import BookRepo from "../dbrepo/book.repo.js";

function bookRouter(bookRepo: BookRepo) {
    const book = new BookController(bookRepo)

    // 使用子路由
    const router = express.Router();

    // 获取图书列表 ?pageInt=1&pageSize=20
    router.get("/", book.listBooksHandler)

    // 查找图书 ?keyword=xxx&pageInt=1&pageSize=20
    router.get("/search", book.searchBooksHandler)

    // 获取图书详情
    router.get("/:bookid", book.getBookHandler)

    return router
}

export default bookRouter
