"use client"

import React, { useEffect, useState } from 'react';
import { getAllBooks, delBookHandler } from '@/app/api';
import { showPic } from '@/app/lib';
import Link from 'next/link';

// 管理员图书列表管理，负责新增/修改/删除/列表查询
const AdminBook = () => {
  const [booksList, setBookList] = useState<any[]>([]);

  const getTableData = () => {
    getAllBooks().then(res => {
      if (res.status === 200) {
        setBookList(res.data)
      }
    })
  }

  const deleteBook = (id: number) => {
    delBookHandler(id).then(res=>{
      alert(res.error)
      if(res.status === 200) {
        getTableData()
      }
    })
  }

  useEffect(() => {
    getTableData()
  }, [])

  return (
    <div className="container py-3">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">封面</th>
            <th scope="col">书名</th>
            <th scope="col">作者</th>
            <th scope="col">价格</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
          {
            booksList.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img src={showPic(item.cover_pic)} width={60} height={60} alt="图书封面" />
                </td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>¥ {item.pirce}</td>
                <td>
                  <Link type="button" className="btn btn-primary btn-sm" href={`/admin/addbook?bookid=${item.id}`}>
                    编辑
                  </Link>
                  <button type="button" className="btn btn-danger btn-sm ms-2" onClick={()=>deleteBook(item.id)}>删除</button>
                </td>
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  )
}

export default AdminBook