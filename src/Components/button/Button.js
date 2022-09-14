import React from "react";

const Button = ({ onClick, className, children, bgColor = "primary" }) => {
  let bgClassName = "btn-danger";
  switch (bgColor) {
    case "primary":
      bgClassName = "btn-danger";
      break;
    case "secondary":
      bgClassName = "btn-success";
      break;
    default:
      break;
  }
  return (
    <button
      onClick={onClick}
      className={`btn w-auto ${bgClassName} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
