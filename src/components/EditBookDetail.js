import { Button, Grid, InputLabel, MenuItem, MenuList, Select, TextField } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export const EditBookDetail = () => {
    const id = useParams().id
    const [book, setbook] = useState('')
    const [bookName, setbookName] = useState(book.bookName)
    const [author, setauthor] = useState(book.author)
    const [borrowDate, setborrowDate] = useState(book.borrowDate)
    const [returnDate, setreturnDate] = useState(book.returnDate)
    const [borrowedBy, setborrowedBy] = useState(book.borrowedBy)
    const [students, setstudents] = useState([])
    const navigate = useNavigate()

    const getStudents = () => {
        axios.get('http://localhost:8080/students').then(res => {
            setstudents(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    const getBookDetail = () => {
        axios.get(`http://localhost:8080/books/${id}`).then(res => {
            console.log(res.data)
            setbook(res.data)
        }).catch(err => {
            console.log(err)
        })
    }
    useEffect(() => {
        getStudents();
        getBookDetail();
    }, [])


    const updateData = (e) => {
        e.preventDefault();
        var data = {
            bookName: bookName,
            author: author,
            borrowDate: borrowDate,
            borrowedBy: borrowedBy,
            returnDate: returnDate
        }
        axios.put(`http://localhost:8080/books/${id}`, data).then(res => {
            console.log(res.data)
            navigate('/books')
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Container sx={{ margin: 'auto', p: 6 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <form onSubmit={updateData}>
                        <div style={{ margin: '25px' }}>
                            <label htmlFor="bookName" style={{ marginRight: '35px' }}>Book Name</label>
                            <TextField
                                id="outlined-helperText"
                                label={book.bookName}
                                name='bookName'
                                onChange={(e) => { setbookName(e.target.value) }}
                            />
                        </div>
                        <div style={{ margin: '25px' }}>
                            <label htmlFor="author" style={{ marginRight: '20px' }}>Author Name</label>
                            <TextField
                                id="outlined-helperText"
                                label={book.author}
                                name='author'
                                onChange={(e) => { setauthor(e.target.value) }}
                            />
                        </div>
                        <div style={{ margin: '25px' }}>
                        <label htmlFor="borrowedBy" style={{ marginRight: '25px' }}>Borrowed By</label>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label={book.borrowedBy}
                            name="borrowedBy"
                            onChange={(e) => { setborrowedBy(e.target.value) }}
                        >
                            {
                                students.map(student => {
                                    return (
                                        <MenuItem value={student.id}>{student.firstName}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        </div>
                        <div style={{ margin: '25px' }}>
                        <label htmlFor="borrowDate" style={{ marginRight: '25px' }}>Borrow Date</label>
                        <input type='date' id='borrowDate' name='borrowDate' onChange={(e) => { setborrowDate(e.target.value) }} defaultValue={book.borrowDate} />
                        </div>
                        <div style={{ margin: '25px' }}>
                        <label htmlFor="returnDate" style={{ marginRight: '28px' }}>Return Date</label>
                        <input type="date" name="returnDate" id="returnDate" onChange={(e) => { setreturnDate(e.target.value) }} defaultValue={book.returnDate} />
                        </div>
                        <div style={{ margin: '25px' }}>
                        <Button variant="contained" type="submit">Update Data</Button>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}
