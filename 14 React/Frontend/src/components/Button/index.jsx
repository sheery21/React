import React from "react";

const Button = ({
  type = "button",
  className = "",
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
