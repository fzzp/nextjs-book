"use client";

import { useStore } from "@/hooks/useStore";
import Link from "next/link"
import { useEffect, useState } from "react";
import { storeGet } from "@/app/lib";


function AuthStatusCard() {
    // 这里服务端渲染时，会报错
    // const [store, setValue] = useStore<any>("user", {})

    const [user, setUser] = useState<any>({})

    useEffect(()=>{
        setUser(storeGet("user", {}))
    }, [])
    
    return (
        <li className="nav-item dropdown ms-3">
            <img src={user.avatar ? user.avatar : "/avatar.png"} className="nav-link p-0 dropdown-toggle rounded-circle"
                data-bs-toggle="dropdown" aria-expanded="false" width="40" height="40" alt="用户头像" />
            <ul className="dropdown-menu dropdown-menu-start">
                <li>
                    <a className="dropdown-item d-flex align-items-center">
                        <img src={user.avatar ? user.avatar : "/avatar.png"} className="rounded-circle shadow-sm" width={40} height={40} alt="用户头像" />
                        <span className="ms-2">{user.username}</span>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item" href="#">个人设置</a></li>
                <li> <Link className="dropdown-item"  href={"/admin/booklist"}>后台管理</Link> </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item" href="#">退出登陆</a></li>
            </ul>
        </li>
    )
}

export default AuthStatusCard