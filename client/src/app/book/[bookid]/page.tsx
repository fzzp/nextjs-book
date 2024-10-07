import React from 'react'

 type BookDetailProps = {
    params: {
        bookid: number
    }
 }
const BookDetail = ({params}: BookDetailProps) => {
  return (
    <div>BookDetail {params.bookid}</div>
  )
}

export default BookDetail