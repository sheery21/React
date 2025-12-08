import React from 'react'
import { Outlet , Navigate} from 'react-router-dom'

const PrivateRoute = () => {
  const uid = localStorage.getItem("userUid");
  return uid ? <Outlet /> : <Navigate to="/" replace />;  
}

export default PrivateRoute