import { Button, Grid, TextField } from '@mui/material'
import { Container } from '@mui/system'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const EditStudentDetail = () => {
  const [student, setstudent] = useState('')
  const id = useParams().id
  const [firstName, setfirstName] = useState(student.firstName)
  const [lastName, setlastName] = useState(student.lastName)

  const getStudentDetail = () =>{
    axios.get(`http://localhost:8080/students/${id}`).then(res=>{
      console.log(res.data)
      setstudent(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }

  useEffect(() => {
    getStudentDetail()
  }, [])
  

  const updateData = (e) => {
    e.preventDefault();
    var data = {
      firstName: firstName,
      lastName: lastName
    }
    axios.put(`http://localhost:8080/students/${id}`, data).then(res => {
      console.log(res.data)
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
              <label htmlFor="firstName" style={{ marginRight: '35px' }}> First Name</label>
              <TextField
                id="outlined-helperText"
                label={student.firstName}
                name='firstName'
                defaultValue={student.firstName}
                onChange={(e) => { setfirstName(e.target.value) }}
              />
            </div>
            <div style={{ margin: '25px' }}>
              <label htmlFor="lastName" style={{ marginRight: '35px' }}>Last Name</label>
              <TextField
                id="outlined-helperText"
                label={student.lastName}
                name='lastName'
                defaultValue={student.lastName}
                onChange={(e) => { setlastName(e.target.value) }}
              />
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
