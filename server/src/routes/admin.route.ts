import express from "express";
import AdminController from "../controllers/admin.controller.js";
import BookRepo from "../dbrepo/book.repo.js";

function adminRouter(bookRepo: BookRepo) {
    const admin = new AdminController(bookRepo)

    // 使用子路由
    const router = express.Router();

    // 创建图书
    router.post("/create/book", admin.createBookHandler)

    // 更新图书
    router.put("/update/book/:bookid", admin.updateBookHandler)

    // 删除图书
    router.delete("/delete/book/:bookid", admin.delBookHandler)

    return router
}

export default adminRouter
