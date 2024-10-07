import BetterSqlite3 from 'better-sqlite3';
import Book from '../models/book.js';
import { customDbError } from './error.js';

class BookRepo {
    private db: BetterSqlite3.Database
    constructor(db: BetterSqlite3.Database) {
        this.db = db
    }

    insert(book: Book) {
        try {
            const stmt = this.db.prepare(
                `insert into books(
                    title, 
                    author, 
                    price, 
                    cover_pic,
                    description
                ) values(
                    @title,
                    @author,
                    @price,
                    @cover_pic,
                    @description
                )`
            )
            const res = stmt.run({ ...book })
            if (res.lastInsertRowid <= 0) {
                throw new Error(customDbError("添加失败"))
            }
            return res.lastInsertRowid
        } catch (error) {
            throw error
        }
    }

    update(book: Book) {
        try {
            const stmt = this.db.prepare(`
                update books set
                    title = @title,
                    author = @author,
                    price = @price,
                    cover_pic = @cover_pic,
                    description = @description
                where id = @id
                `
            );

            // 直接传 book 会报错
            let res = stmt.run({...book})

            if (res.changes <= 0) {
                throw new Error(customDbError("更新失败，图书不存在"))
            }

            return true

        } catch (error) {
            throw error
        }
    }

    get(id: number) {
        try {
            const stmt = this.db.prepare(
                `select * from books where id = ?`
            )
            const item = stmt.get(id)
            return item
        } catch (error) {
            throw error
        }
    }

    getAll() {
        try {
            const stmt = this.db.prepare(
                `select * from books`
            )
            const list = stmt.all() || []
            return list
        } catch (error) {
            throw error
        }
    }

    queryByKeyword(keyword: string) {
        try {
            const stmt = this.db.prepare(
                `select * from books where title like '%`+keyword+"%'"
            )
            const list = stmt.get() || []
            return list
        } catch (error) {
            throw error
        }
    }

    delete(id: number) {
        try {
            let stmt = this.db.prepare(`
                delete from books where id = ?    
            `)

            let res = stmt.run(id)

            if (res.changes <= 0) {
                return false
            }

            return true
        } catch (error) {
            throw error
        }
    }

}

export default BookRepo