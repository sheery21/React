import React from 'react'

const Input = ( {type,  value,onChange,placeholder,className,ariaLabel  }) => {
  return (
    <input type={type} value={value} onChange={onChange} placeholder={placeholder} className={className} aria-label={ariaLabel } />
  )
}
export default Input