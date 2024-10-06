import { Request, Response } from "express";
class BookController {
    constructor(){}

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