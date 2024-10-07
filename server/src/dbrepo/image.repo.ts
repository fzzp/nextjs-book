import BetterSqlite3 from 'better-sqlite3';
import { ImageModel } from '../models/image.js';
import { customDbError } from './error.js';

class ImageRepo {
    private db: BetterSqlite3.Database
    constructor(db: BetterSqlite3.Database) {
        this.db = db
    }

    insert(img: ImageModel){
        try {
            const stmt = this.db.prepare(
                `insert into images(filename, data) values(?,?)`
            )
            const res = stmt.run(img.filename, img.data)
            if (res.lastInsertRowid <= 0) {
                throw new Error(customDbError("添加失败"))
            }
            return res.lastInsertRowid
        } catch (error) {
            throw error
        }
    }

    get(filename: string){
        try {
            const stmt = this.db.prepare(
                `select * from images where filename = ? limit 1`
            )
            const img = stmt.get(filename)
            return img
        } catch (error) {
            throw error
        }
    }
}

export default ImageRepo