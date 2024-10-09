import React from 'react';

// 管理员图书列表管理，负责新增/修改/删除/列表查询
const AdminBook = async () => {
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
          <tr>
            <th scope="row">1</th>
            <td>
              <img src="" alt="图书封面" />
            </td>
            <td>书名</td>
            <td>作者</td>
            <td>¥99.00</td>
            <td>
              <button type="button" className="btn btn-primary btn-sm">编辑</button>
              <button type="button" className="btn btn-danger btn-sm ms-2">编辑</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AdminBook