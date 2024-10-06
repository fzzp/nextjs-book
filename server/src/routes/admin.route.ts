import express from "express";
import AdminController from "../controllers/admin.controller.js";

const admin = new AdminController()

// 使用子路由
const router = express.Router();

// 创建图书
router.post("/create/book", admin.createBookHandler)

// 更新图书
router.put("/update/book/:bookid", admin.updateBookHandler)

// 删除图书
router.delete("/delete/book/:bookid", admin.delBookHandler)


export default router
