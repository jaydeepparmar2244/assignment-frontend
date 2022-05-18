import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom';

export const ViewOneStudent = () => {
    const [student, setstudent] = useState([])
    const id = useParams().id
    const getStudentDetail = () =>{
        axios.get(`http://localhost:8080/students/${id}`).then(res=>{
            setstudent(res.data)
            console.log(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(() => {
      getStudentDetail();
    }, [])
    
  return (
    <div>
        <h3>{student.id} {student.firstName} {student.lastName}</h3>
    </div>
  )
}
