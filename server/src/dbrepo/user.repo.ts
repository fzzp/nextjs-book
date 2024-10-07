import BetterSqlite3 from 'better-sqlite3';
import User from '../models/user.js';
import { customDbError } from './error.js';

class UserRepo {
    private db: BetterSqlite3.Database
    constructor(db: BetterSqlite3.Database) {
        this.db = db
    }

    tdb() {
        return this.db
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

    getByEmail(email: string) {
        try {
            const stmt = this.db.prepare(
                `select * from users where email = ?`
            )
            const user = stmt.get(email)
            return user
        } catch (error) {
            throw error
        }
    }

    getById(id: number) {
        try {
            const stmt = this.db.prepare(
                `select * from users where id = ?`
            )
            const user = stmt.get(id)
            return user
        } catch (error) {
            throw error
        }
    }

    update(user: User) {
        try {
            const stmt = this.db.prepare(`
                update users
                    set username=@username, avatar=@avatar, updated_at=datetime('now', 'localtime')
                where id =@id
                `
            );

            let res = stmt.run({
                id: user.id,
                username: user.username,
                avatar: user.avatar
            })

            if (res.changes <= 0) {
                throw new Error(customDbError("更新失败，用户不存在"))
            }

            return true

        } catch (error) {
            throw error
        }
    }
}

export default UserRepo