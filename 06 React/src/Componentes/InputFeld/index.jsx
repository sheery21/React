import React from 'react'

const Input = ( {type, placeholder, required , onChange , value} ) => {
  return (
    <input type={type} value={value} onChange={onChange} required={required} placeholder={placeholder} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
  )
}

export default Input