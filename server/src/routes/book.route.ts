import express from "express";
import BookController from "../controllers/book.controller.js";

const book = new BookController() 

// 使用子路由
const router = express.Router();

// 获取图书列表 ?pageInt=1&pageSize=20
router.get("/", book.listBooksHandler)

// 查找图书 ?keyword=xxx&pageInt=1&pageSize=20
router.get("/search", book.searchBooksHandler)

// 获取图书详情
router.get("/:bookid", book.getBookHandler)


export default router
