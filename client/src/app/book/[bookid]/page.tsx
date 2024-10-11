import React from 'react'
import ClientNavbar from "@/components/ClientNavbar";
import { cookies } from "next/headers";
import { getOneBook } from '@/app/api';
import { showPic } from "@/app/lib";

type BookDetailProps = {
  params: {
    bookid: number
  }
}
const BookDetail = async ({ params }: BookDetailProps) => {
  // const pic = "http://localhost:8901/show/pic/ec56123500b0d8970428864455e9d9682c20dd7c3e5c0c2a74ac3ef2a9d8bf71"
  let token = cookies().get("token")?.value || ""
  const { data } = await getOneBook(params.bookid)

  return (
    <div>
      <ClientNavbar token={token}></ClientNavbar>
      <div className="album pb-5 bg-body-tertiary" style={{ paddingTop: 80 }}>
        <div className="container">
          <div className="row  g-2">
            <div className="col">
              <img src={showPic(data.cover_pic)} className="shadow-sm" width="100%" height="400" alt="图书" />
            </div>
            <div className="col ps-3 py-4 d-flex flex-column justify-content-between">
              <h1 className="fs-3">{data.title}</h1>
              <div>
                <div>
                  <span className='text-body-secondary'>作者:</span>
                  <span className='fs-5 text-primary fw-bold ps-2'>{data.author}</span>
                </div>
                <div className="mt-4">
                  <span className='text-body-secondary'>价格:</span>
                  <span className='fs-5 text-danger fw-bold ps-2'>¥ {data.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 图书详情 */}
      <div className="col-lg-10 mx-auto p-4">
        <header className="pb-3 border-bottom fw-bold fs-5 text-center">
          图书详情
        </header>

        <div className="py-3">
          {data.description}
        </div>
      </div>
    </div>
  )
}

export default BookDetail