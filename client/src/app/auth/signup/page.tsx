import type { Metadata } from "next";
import AuthForm from '@/components/AuthForm';

export const metadata: Metadata = {
  title: "Next.js 注册",
  description: "学习 Next.js 的全栈项目",
};
const SignUp = async () => {
  return (
    <AuthForm formType='SIGNUP' />
  )
}

export default SignUp