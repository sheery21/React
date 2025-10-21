import React from "react";

const Input = ({className, value, onChange}) => {
  return (
    <input
      type="text"
      className={className}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
