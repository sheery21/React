import React from "react";

const Input = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
    />
  );
};

export default Input;
