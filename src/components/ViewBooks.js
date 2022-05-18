import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ViewBooks = () => {
  const [books, setbooks] = useState([])
   
  const getBooksDetails = () => {
      axios.get('http://localhost:8080/books').then(res=>{
          setbooks(res.data)
          console.log(res.data)
      }).catch(err=>{
          console.log(err)
      })
  }

  useEffect(() => {
    getBooksDetails()
  }, [])
  
  return (
    <div>
        {
            books.map(book=>{
                return(
                    <h3>{book.bookName}  {book.author}  {book.borrowDate} {book.returnDate}  {book.borrowedBy}</h3>
                )
            })
        }
    </div>
  )
}
