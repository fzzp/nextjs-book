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
      {
        data.map((item: any)=>(
          <div key={item.id} style={{marginBottom: 20}}>
            <p>{item.title}</p>
            <p>{item.author}</p>
            <p>{item.price}</p>
          </div>
        ))
      }
    </div>
  );
}
