import BetterSqlite3 from 'better-sqlite3';


function openDb(dsn) {
    const db = new BetterSqlite3(dsn, { verbose: console.log });
    db.pragma("journal_mode = WAL");
    return db
}

export default openDb