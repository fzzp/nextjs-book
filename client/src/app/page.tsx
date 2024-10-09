import ClientNavbar from "@/components/ClientNavbar"

async function getBooks() {
  const res = await fetch("http://localhost:8901/v1/books")
  if (!res.ok) {
    throw new Error("请求数据失败")
  }

  return res.json()
}

// 返回HTML结构，实现服务端渲染数据
export default async function Home() {
  const { data } = await getBooks()
  return (
    <div>
      <ClientNavbar></ClientNavbar>
    </div>
  );
}
