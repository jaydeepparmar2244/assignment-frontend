import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';

export const ViewStudents = () => {
    const [students, setstudents] = useState([])

    const getStudentsDetails = () => {
        axios.get('http://localhost:8080/students').then(res => {
            setstudents(res.data)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getStudentsDetails();
    }, [])

    return (
        <Container sx={{margin:'auto',p:6}}>
        <Grid container spacing={2}>
            <Grid item xs={8}>
                {/* <Item>xs=4</Item> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <caption>Students Table</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Id</b></TableCell>
                            <TableCell align="right"><b>First Name</b></TableCell>
                            <TableCell align="right"><b>Last Name</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            students.map(student => {
                                return (
                                    <TableRow
                                        key={student.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {student.id}
                                        </TableCell>
                                        <TableCell align="right">{student.firstName}</TableCell>
                                        <TableCell align="right">{student.lastName}</TableCell>
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
