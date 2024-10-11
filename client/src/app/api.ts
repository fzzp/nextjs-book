// 这块是直接对接后台服务的api，用于客户端组件直接请求api接口

import { SignupRequest, AddBookRequest } from "@/types/request";
import { requestForBackendApi } from "./lib";

// 注册
export async function signupHandler(req: SignupRequest) {
    return requestForBackendApi("/v1/auth/signup", "POST", req)
}

// 添加图书
export async function addBookHandler(req: AddBookRequest) {
    return requestForBackendApi("/v1/admn/create/book", "POST", req)
}

// 获取所有图书
export async function getAllBooks() {
    return requestForBackendApi("/v1/books", "GET") 
}

// 获取详情
export async function getOneBook(id: number | string) {
    return requestForBackendApi("/v1/books/" + id, "GET") 
}

// 更新一本书
export async function putBookHandler(id: number | string, req: AddBookRequest) {
    return requestForBackendApi("/v1/admn/update/book/" + id, "PUT", req)
}

// 删除一本图书
export async function delBookHandler(bookid: string| number) {
    return requestForBackendApi("/v1/admn/delete/book/" + bookid, "DELETE")
}