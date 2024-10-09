import React from 'react'
// import { headers } from "next/headers";
import AdminNavbar from "@/components/AdminNavbar"

import "./layout.css"

function layout({ children }: { children: React.ReactNode }) {
	// const headerList = headers();
	// const pathname = headerList.get("x-current-path");
	// console.log(pathname)
	return (
		<>
			<AdminNavbar />
			{children}
		</>
	)
}

export default layout