"use client";

import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type PswdInputType = "password" | "text";
type FormType = "LOGIN" | "SIGNUP"

const SignUpForm = ({ formType }: { formType: FormType }) => {
	const [showPswd, setShowPswd] = useState(false)
	const [pswdType, setPswdType] = useState<PswdInputType>("password")

	const trigger = () => {
		setShowPswd(!showPswd)
		if (pswdType === 'password') {
			setPswdType("text")
		} else {
			setPswdType("password")
		}
	}

	return (
		<div className="container-xxl">
			<div className="login-box mx-auto">

				<div className="card">
					<div className="card-body">
						<h4 className="mb-2 text-center"> {formType === 'SIGNUP' ? '注册' : '登陆'} </h4>
						<p className="mb-4 text-center">{formType === 'SIGNUP' ? '欢迎使用!' : '欢迎回来'}</p>

						<form className="mb-3" method="POST">
							<div className="mb-3">
								<label htmlFor="email" className="form-label">邮箱地址</label>
								<input type="text" className="form-control" id="email" name="email" placeholder="请输入" />
							</div>

							<div className="mb-3 form-password-toggle">
								<label className="form-label" htmlFor="password">账号密码</label>
								<div className="input-group input-group-merge">
									<input type={pswdType} id="password" className="form-control" name="password" placeholder=""
										aria-describedby="password" />
									<span className="input-group-text cursor-pointer" onClick={trigger}>
										{
											showPswd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
										}
									</span>
								</div>
							</div>

							{
								formType === 'SIGNUP' ?
									<div className="mb-4 form-password-toggle">
										<label className="form-label" htmlFor="repassword">确认密码</label>
										<div className="input-group input-group-merge">
											<input type={"password"} id="repassword" className="form-control" name="repassword" placeholder=""
												aria-describedby="password" />
										</div>
									</div> : null
							}

							<button className="btn btn-primary w-100 text-white">{formType === "SIGNUP" ? "注册" : "登陆"}</button>
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