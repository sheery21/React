import React from 'react'

const Button = ({type,onClick,text ,className}) => {
  return (
    <button type={type} onClick={onClick} className={`custom-btn ${className}`}> {text}</button>
  )
}

export default Button