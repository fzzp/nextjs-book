import BetterSqlite3 from 'better-sqlite3';
import User from '../models/user.js';
import { customDbError } from './error.js';

class UserRepo {
    private db: BetterSqlite3.Database
    constructor(db: BetterSqlite3.Database) {
        this.db = db
    }

    insert(user: User) {
        try {
            const stmt = this.db.prepare(
                `insert into users(username, email, password) values(?,?,?)`
            )
            const res = stmt.run(user.username, user.email, user.password)
            if (res.lastInsertRowid <= 0) {
                throw new Error(customDbError("添加失败"))
            }
            return res.lastInsertRowid
        } catch (error) {
            throw error
        }
    }
}

export default UserRepo