"use client";

import Image from 'next/image';

function AuthStatusCard() {
    const avatar = "http://localhost:8901/show/pic/ec56123500b0d8970428864455e9d9682c20dd7c3e5c0c2a74ac3ef2a9d8bf71"
    return (
        <li className="nav-item dropdown ms-3">
            <img src="" className="nav-link p-0 dropdown-toggle rounded-circle"
                data-bs-toggle="dropdown" aria-expanded="false" width="40" height="40" alt="用户头像" />
            <ul className="dropdown-menu dropdown-menu-start">
                <li>
                    <a className="dropdown-item d-flex justify-content-center align-items-center">
                        <img src={avatar} className="rounded-circle" width={40} height={40} alt="用户头像" />
                        <span className="ms-2">用户名</span>
                    </a>
                </li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item" href="#">个人设置</a></li>
                <li>
                    <hr className="dropdown-divider" />
                </li>
                <li><a className="dropdown-item" href="#">退出登陆</a></li>
            </ul>
        </li>
    )
}

export default AuthStatusCard