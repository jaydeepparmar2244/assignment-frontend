import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const EditBookDetail = () => {
    const id = useParams().id
    const [book, setbook] = useState('')
    const [bookName, setbookName] = useState(book.bookName)
    const [author, setauthor] = useState(book.author)
    const [borrowDate, setborrowDate] = useState(book.borrowDate)
    const [returnDate, setreturnDate] = useState(book.returnDate)
    const [borrowedBy, setborrowedBy] = useState(book.borrowedBy)
    const [students, setstudents] = useState([])

    const getStudents = () =>{
        axios.get('http://localhost:8080/students').then(res=>{
            setstudents(res.data)
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    const getBookDetail = () =>{
        axios.get(`http://localhost:8080/books/${id}`).then(res=>{
            console.log(res.data)
            setbook(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }
    useEffect(() => {
        getStudents();
        getBookDetail();
    }, [])
    

    const updateData = (e) =>{
        e.preventDefault();
        var data = {
            bookName:bookName,
            author:author,
            borrowDate:borrowDate,
            borrowedBy:borrowedBy,
            returnDate:returnDate
        }
        axios.put(`http://localhost:8080/books/${id}`,data).then(res=>{
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

  return (
    <div>
        <form onSubmit={updateData}>
            <label htmlFor="bookName">Book Name</label>
            <input type="text" id='bookName' name='bookName' onChange={(e)=>{setbookName(e.target.value)}} defaultValue={book.bookName} />
            <label htmlFor="author">Author Name</label>
            <input type="text" name="author" id="author" onChange={(e)=>{setauthor(e.target.value)}} defaultValue={book.author} />
            <label htmlFor="borrowedBy">Borrowed By</label>
            <select name="borrowedBy" id="borrowedBy" onChange={(e)=>{setborrowedBy(e.target.value)}}>
                {
                    students.map(student=>{
                        return(
                            <option value={student.id}>{student.firstName}</option>           
                        )
                    })
                }
            </select>
            {/* <input type="text" name='borrowedBy' id='borrowedBy' onChange={(e)=>{setborrowedBy(e.target.value)}} defaultValue={book.borrowedBy} /> */}
            <label htmlFor="borrowDate">Borrowed Date</label>
            <input type='date' id='borrowDate' name='borrowDate' onChange={(e)=>{setborrowDate(e.target.value)}} defaultValue={book.borrowDate} />
            <label htmlFor="returnDate">Expected Return Date</label>
            <input type="date" name="returnDate" id="returnDate" onChange={(e)=>{setreturnDate(e.target.value)}} defaultValue={book.returnDate} />
            <button type='submit'>Update Data</button>
        </form>
    </div>
  )
}
