import axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export const EditStudentDetail = () => {
  const id = useParams().id
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')

  const updateData = (e) =>{
    e.preventDefault();
    var data = {
      firstName:firstName,
      lastName:lastName
    }
    axios.put(`http://localhost:8080/students/${id}`,data).then(res=>{
       console.log(res.data)
    }).catch(err=>{
      console.log(err)
    })
  }

  return (
    <div>
      <form onSubmit={updateData}>
        <label htmlFor="firstName"> First Name</label>
        <input type="text" id='firstName' name='firstName' onChange={(e)=>{setfirstName(e.target.value)}} />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id='lastName' name='lastName'onChange={(e)=>{setlastName(e.target.value)}}/>
        <button type='submit'>Update data</button>
      </form>
    </div>
  )
}
