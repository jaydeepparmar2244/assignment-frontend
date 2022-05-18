import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ViewOneBook = () => {
  const [book, setbook] = useState([])
  const id = useParams().id
  
  const getBookDetail = () =>{
      axios.get(`http://localhost:8080/books/${id}`).then(res=>{
          setbook(res.data)
          console.log(res.data)
      }).catch(err=>{
          console.log(err)
      })
  }

  useEffect(() => {
      getBookDetail()
  }, [])

  return (
    <div>
       <h3>{book.bookName}  {book.author}  {book.borrowDate}  {book.returnDate}   {book.borrowedBy}</h3>
    </div>
  )
}
