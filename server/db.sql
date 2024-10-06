CREATE TABLE IF NOT EXISTS users (
    id integer not null primary key,
    email text not null,
    password text not null,
    username text not null,
    avatar text not null default '',
    -- role 角色：0:普通用户，1:管理员
    role integer not null default 0,
    created_at datetime not null default (datetime('now', 'localtime')),
    updated_at datetime not null default (datetime('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS books (
    id integer not null primary key,
    title text not null,
    author text not null,
    -- price 价格，单位分
    price integer not null,
    cover_pic text not null default '',
    description text not null,
    created_at datetime not null default (datetime('now', 'localtime')),
    updated_at datetime not null default (datetime('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS images (
    id integer not null primary key,
    filename text not null,
    data blob not null
); 


-- 创建索引
create unique index if not exists idx_user_email on users(email);
create index if not exists idx_book_title on books(title);
create unique index if not exists idx_images_filename on images(filename);
