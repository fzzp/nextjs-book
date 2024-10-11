import { LoginRequest, SignupRequest } from "@/types/request";
import { cookies } from "next/headers";

type Methods = "GET" | "POST" | "DELETE" | "PUT"

export async function request<T>(url: string, method: Methods, params:T = {} as T) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params)
    })

    const data = await res.json()

    return  {status: res.status, ...data}
}


export async function signupHandler(req: SignupRequest) {
    return request("/v1/auth/signup", "POST", req)
}

export async function loginHandler(req: LoginRequest) {
    const data = await request("/v1/auth/login", "POST", req)
    if(data.status == 200) {
        cookies().set("token", data.token)
    }

    return data
}