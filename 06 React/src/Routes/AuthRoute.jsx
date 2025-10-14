import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Home from '../Pages/Home'

const AuthRoute = () => {
  return (
    !localStorage.getItem("userUid")? <Outlet/> : <Navigate to="/home"/> 
  )
}

export default AuthRoute