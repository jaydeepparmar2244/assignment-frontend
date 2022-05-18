import React, { useEffect, useState } from 'react'
import axios from 'axios';

export const ViewStudents = () => {
    const [students, setstudents] = useState([])

    const getStudentsDetails = () =>{
        axios.get('http://localhost:8080/students').then(res=>{
            setstudents(res.data)
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(() => {
      getStudentsDetails();
    }, [])
    
  return (
    <div>
        {
            students.map(student =>{
                return(
                    <>
                    <h3>{student.id}  {student.firstName}  {student.lastName}</h3>
                    </>
                )
            })
        }
    </div>
  )
}
