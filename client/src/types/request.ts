export type SignupRequest = {
    username: string;
    email: string;
    password: string;
}

export type LoginRequest = {
    email: string;
    password: string;
}

export type AddBookRequest = {
    "title": string;
    "author": string;
    "price": number;
    "cover_pic": string;
    "description": string;
}