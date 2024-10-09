import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	// console.log("current pathname: ", request.nextUrl.pathname);
	// 添加请求头
	const headers = new Headers(request.headers);
	headers.set("x-current-path", request.nextUrl.pathname);
	// 传递下去
	return NextResponse.next({ headers });
}

// 自定义匹配那些路由
// export const config = {
//     matcher: [
//         "",
//     ],
// };