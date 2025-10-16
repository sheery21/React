import React from "react";

const Button = ({ className = "", onClick, text }) => {
  return (
    <>
      <button
        type="button"
        className={`transition ${className}`}
        onClick={onClick}
      >
        {" "}
        {text}{" "}
      </button>
    </>
  );
};

export default Button;
