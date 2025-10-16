import React from "react";

const Input = ({ type, placeholder, className, onChange, value }) => {
  return (
    <>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        className={className}
        onChange={onChange}
      />
    </>
  );
};

export default Input;
