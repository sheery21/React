import axios from 'axios'
import React from 'react'

const Dashboard = () => {
  const createPost = async () =>{
    try {
      const obj ={}
      const URL = "http://localhost:5000/createpost"
      await axios.post(URL,obj , {
        headers : {
          Authorization :`Bearer ${localStorage.getItem("token")}`
        }
      })
      
    } catch (error) {
      alert(error.message)
    }
  }
  return (
    <button onClick={createPost}>Create post!</button>
  )
}

export default Dashboard