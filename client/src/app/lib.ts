type Methods = "GET" | "POST" | "DELETE" | "PUT"

// 直接对接后台的api
export async function requestForBackendApi<T>(url: string, method: Methods, params: T = {} as T) {
	return request(`${process.env.NEXT_PUBLIC_API_URL}${url}`, method, params)
}

// 对接的 next.js api handle
export async function requestForApiHandler<T>(url: string, method: Methods, params: T = {} as T) {
	return request(`${url}`, method, params)
}

// 统一请求风格
async function request<T>(url: string, method: Methods, params: T = {} as T) {
	const headers = new Headers()
	headers.append("Content-Type", "application/json")

	if (typeof localStorage !== "undefined") {
		try {
			let jsonVal = localStorage.getItem("user")
			if (!(jsonVal === null || jsonVal === "undefined")) {
				let user = JSON.parse(jsonVal)
				let token = user.token ? "Bearer " + user.token : ''
				headers.append("Authorization", token)
			}
		} catch (error) {
			console.error(error)
		}
	}
	const res = await fetch(url, {
		method: method,
		headers: headers,
		body: method === "GET" ? undefined : JSON.stringify(params)
	})
	const data = await res.json()
	return { status: res.status, ...data }
}

// 上传图片
export async function fileUploadHanler(formData: any) {
	const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/uploadPic`, {
		method: "POST",
		headers: {
			'Authorization': 'Bearer ' + storeGet('user', {}).token
		},
		body: formData
	})
	const data = await res.json()
	return { status: res.status, ...data }
}


// 显示图片
export function showPic(filename: string) {
	return `${process.env.NEXT_PUBLIC_API_URL}/show/pic/${filename}`
}



// 简单封装一下

export function storeSet<T>(key: string, value: T) {
	let jsonVal: T | string = value
	if(typeof value !== "string") {
		jsonVal = JSON.stringify(value) as string
	}
	localStorage.setItem(key, jsonVal as string)
}

export function storeGet<T>(key: string, initialValue: T | (() => T)) {
	const jsonValue = localStorage.getItem(key);
	console.log(jsonValue)
	if (!(jsonValue === null || jsonValue === "undefined")) return JSON.parse(jsonValue);
	if (typeof initialValue === 'function') {
		return (initialValue as () => T)();
	} else {
		return initialValue;
	}
}

