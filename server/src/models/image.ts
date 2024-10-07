import crypto from "crypto";

export type ImageModel = {
    id: number;
    filename: string;
    data: any
}

export function NewImageModel(data: any): ImageModel {
    // 随机生成一个唯一值，碰撞机会理论上应该不会
    let filename = crypto.randomBytes(32).toString("hex")
    
    return {
        id: 0,
        filename: filename,
        data: data
    }
}