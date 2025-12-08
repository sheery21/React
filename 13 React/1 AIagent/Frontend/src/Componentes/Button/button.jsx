import React from "react";

const Button = ({ text, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
