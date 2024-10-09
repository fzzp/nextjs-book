import type { Metadata } from "next";
import AuthForm from '@/components/AuthForm';

export const metadata: Metadata = {
  title: "Next.js 登陆",
  description: "学习 Next.js 的全栈项目",
};


const Login = async () => {
  return (
    <AuthForm formType='LOGIN' />
  )
}

export default Login