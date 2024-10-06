import { Validator, checkEmail, minValLen, maxValLen, notBlank } from "../validator/index.js";

class Book {
    id: number;
    title: string;
    author: string;
    price: number;
    cover_pic: string;
    description: string;
    created_at: string;
    updated_at: string;
    constructor(title: string, author: string, price: number, cover_pic: string, description: string) {
       this.title = title
       this.author = author
       this.price = price
       this.cover_pic = cover_pic
       this.description = description
    }

    checkUser() {
        const validator = new Validator()
        validator.checkField(notBlank(this.author), "author", "作者不能为空")
        validator.checkField(notBlank(this.title), "title", "标题不能为空")
        validator.checkField(notBlank(this.description), "description", "描述不能为空")
        validator.checkField(notBlank(this.cover_pic), "cover_pic", "封面图不能为空")
        validator.checkField(this.price >= 0, "price", "价格必须大于等于0")

        return validator
    }
}


export default Book
