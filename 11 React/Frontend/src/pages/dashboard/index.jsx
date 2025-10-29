import React from 'react'
import Button from '../../components/Button'
import { useNavigate } from 'react-router-dom'

const DashBasrd = () => {

   const navigate = useNavigate();
  const click = async () =>{
    localStorage.removeItem("token");
    navigate("/");
  }
  return (
    <Button 
    onClick={click}
    text={'LogOut'}
    />
  )
}

export default DashBasrd