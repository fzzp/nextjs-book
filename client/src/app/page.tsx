import Link from "next/link";
import ClientNavbar from "@/components/ClientNavbar";
import { cookies } from "next/headers";
import { getAllBooks } from "./api";
import { showPic } from "./lib";


export default async function Home() {

  let token = cookies().get("token")?.value || ""

  const { data: books } = await getAllBooks()

  return (
    <div>
      <ClientNavbar token={token}></ClientNavbar>
      <div className="album pb-5 bg-body-tertiary" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {
              books.map((item: any) => (
                <div className="col" key={item.id}>
                  <div className="card shadow-sm">
                    <img src={showPic(item.cover_pic)} width="100%" height="300" alt="图书" />
                    <div className="card-body">
                      <p className="card-text text-center">{item.title}</p>
                      <div className="d-flex justify-content-center">
                        <Link className="text-body-primary" href={`/book/${item.id}`}>查看详情</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}
