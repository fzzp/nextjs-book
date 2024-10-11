"use client"

import { signupHandler } from '@/app/api';
import { LoginRequest, SignupRequest } from '@/types/request';
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { requestForApiHandler } from '@/app/lib';

type PswdInputType = "password" | "text";
type FormType = "LOGIN" | "SIGNUP";

const SignUpForm = ({ formType }: { formType: FormType }) => {
	const [showPswd, setShowPswd] = useState(false)
	const [pswdType, setPswdType] = useState<PswdInputType>("password")

	const router = useRouter()

	const trigger = () => {
		setShowPswd(!showPswd)
		if (pswdType === 'password') {
			setPswdType("text")
		} else {
			setPswdType("password")
		}
	}

	const handleAction = (event: any) => {
		event.preventDefault()
		event.stopPropagation()

		let isValid = true
		const forms = document.querySelectorAll('.needs-validation')
		Array.from(forms).forEach((form: any) => {
			if (!form.checkValidity()) {
				isValid = false
			}
			form.classList.add('was-validated')
		})

		if (!isValid) {
			console.log("验证失败")
			return
		}

		let f = forms[0] as any
		let req = {
			email: f.elements.email.value,
			password: f.elements.password.value,
			repassword: formType === "SIGNUP" ? f.elements.repassword.value : ''
		}

		if (formType === "SIGNUP") {
			if (req.password != req.repassword) {
				alert("两次密码不一致")
				return
			}
			handleRegister(req)
		} else {
			handleLogin(req)
		}
	}

	// 登陆，先是请求nextjs的api handler，由api handler 请求后台接口，这样api hadnler(或者说nextjs服务端)就可以做些服务端事情
	async function handleLogin(req: LoginRequest) {
		requestForApiHandler("/auth/login/api", "POST", req).then(res => {
			alert(res.error)
			if (res.status === 200) {
				// 存储
				localStorage.setItem("user", JSON.stringify(res.data))
				router.push("/")
			}
		})
	}

	function handleRegister(req: any) {
		let params: SignupRequest = {
			email: req.email,
			username: req.email.split("@")[0],
			password: req.password
		}

		signupHandler(params).then((res: any) => {
			alert(res.error)
			if (res.status == 200) {
				router.push("/auth/login")
			}
		})
	}

	return (
		<div className="container-xxl">
			<div className="login-box mx-auto">

				<div className="card">
					<div className="card-body">
						<h4 className="mb-2 text-center"> {formType === 'SIGNUP' ? '注册' : '登陆'} </h4>
						<p className="mb-4 text-center">{formType === 'SIGNUP' ? '欢迎使用!' : '欢迎回来'}</p>

						<form className="mb-3 px-4 needs-validation" noValidate onSubmit={handleAction}>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">邮箱地址</label>
								<input type="text" className="form-control" id="email" name="email" required />
								<div className="invalid-feedback">
									请输入邮箱地址
								</div>
							</div>

							<div className="mb-3 form-password-toggle">
								<label className="form-label" htmlFor="password">账号密码</label>
								<div className="input-group input-group-merge">
									<input type={pswdType} id="password" className="form-control" name="password" required />
									<span className="input-group-text cursor-pointer" onClick={trigger}>
										{
											showPswd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
										}
									</span>
									<div className="invalid-feedback">
										请输入账号密码
									</div>
								</div>
							</div>

							{
								formType === 'SIGNUP' ?
									<div className="mb-4 form-password-toggle">
										<label className="form-label" htmlFor="repassword">确认密码</label>
										<div className="input-group input-group-merge">
											<input type={"password"} id="repassword" className="form-control" name="repassword" required />
											<div className="invalid-feedback">
												请输入确认密码
											</div>
										</div>
									</div> : null
							}

							<button className="btn btn-primary w-100 text-white" type="submit">{formType === "SIGNUP" ? "注册" : "登陆"}</button>
						</form>

						{
							formType === "LOGIN" ?
								<p className="text-center">
									<span>还有没有账号?</span>
									<Link href="/auth/signup"> <span>立即注册</span></Link>
								</p>
								:
								<p className="text-center">
									<span>已有账号?</span>
									<Link href="/auth/login"> <span>立即登陆</span></Link>
								</p>
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUpForm