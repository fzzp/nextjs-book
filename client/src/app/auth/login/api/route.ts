import { requestForBackendApi } from "@/app/lib";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json()

    // 中转，请求后台api
    const res = await requestForBackendApi("/v1/auth/login", "POST", body)

    if (res.status === 200) {
        const { data } = res

        // 设置 token
        cookies().set("token", data.token, {"httpOnly": true})
    }

    return Response.json({...res})
}

