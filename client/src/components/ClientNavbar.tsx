import Link from "next/link"
import { FaGithub } from "react-icons/fa";
import AuthStatusCard from "./AuthStatusCard";
function ClientNavbar({token}:{token: string}) {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark border-bottom border-body">
			<div className="container">
				<Link href="/" className="navbar-brand">
					Books
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
					aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDropdown">
					<ul className="navbar-nav ms-auto">
						<li className="nav-item">
							<form className="d-flex" role="search">
								<input className="form-control me-3" type="search" style={{minWidth: 200, width: 260}} placeholder="输入关键字" aria-label="Search" />
								<button className="btn btn-primary px-3" type="submit">搜  索</button>
							</form>
						</li>

						{
							token ? <AuthStatusCard /> :
							<Link className="btn btn-outline-light ms-5 fs-6" type="button" href={"/auth/login"}>登陆/注册</Link>
						}
						

						{/* <li className="nav-item ms-3">
							<a className="nav-link" target={"_blank"} href="https://github.com/fzzp/ebook">
								<FaGithub size={24} color="#ece6e6" style={{marginTop: "-4px"}} />
							</a>
						</li> */}
					</ul>
				</div>
			</div>
		</nav>
	)
}

export default ClientNavbar