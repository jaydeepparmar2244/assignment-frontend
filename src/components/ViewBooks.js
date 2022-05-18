import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';

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
    // <div>
    //     {
    //         books.map(book=>{
    //             return(
    //                 <h3>{book.bookName}  {book.author}  {book.borrowDate} {book.returnDate}  {book.borrowedBy}</h3>
    //             )
    //         })
    //     }
    // </div>
    <Container sx={{margin:'auto',p:6}}>
    <Grid container spacing={2}>
        <Grid item xs={12}>
            {/* <Item>xs=4</Item> */}
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <caption>Books Table</caption>
                <TableHead>
                    <TableRow>
                        <TableCell><b>Id</b></TableCell>
                        <TableCell align="right"><b>Book Name</b></TableCell>
                        <TableCell align="right"><b>Author</b></TableCell>
                        <TableCell align="right"><b>Borrowed By</b></TableCell>
                        <TableCell align="right"><b>Borrowed Date</b></TableCell>
                        <TableCell align="right"><b>Return Date</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        books.map(book => {
                            return (
                                <TableRow
                                    key={book.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {book.id}
                                    </TableCell>
                                    <TableCell align="right">{book.bookName}</TableCell>
                                    <TableCell align="right">{book.author}</TableCell>
                                    <TableCell align="right">{book.borrowedBy == null?'-':book.borrowedBy}</TableCell>
                                    <TableCell align="right">{book.borrowDate == null?'-':book.borrowDate}</TableCell>
                                    <TableCell align="right">{book.returnDate == null?'-':book.returnDate}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
        </Grid>
    </Grid>
    </Container>
  )
}
