import BetterSqlite3 from 'better-sqlite3';

class ImageRepo {
    private db: BetterSqlite3.Database
    constructor(db: BetterSqlite3.Database) {
        this.db = db
    }
}

export default ImageRepo