"use client"

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from "next/navigation"

function AdminNavbar() {
	const pathname = usePathname();

	return (
		<div className="nav-scroller bg-body shadow-sm admin-navbar">
			<nav className="nav" aria-label="Secondary navigation">
				<Link className={clsx('nav-link', pathname === '/admin/booklist' && 'active')} href="/admin/booklist">图书列表</Link>
				<Link className={clsx('nav-link', pathname === '/admin/addbook' && 'active')} href="/admin/addbook">新增图书</Link>

				<Link className="nav-link ms-auto" href="/">返回前台</Link>
			</nav>
		</div>
	)
}

export default AdminNavbar