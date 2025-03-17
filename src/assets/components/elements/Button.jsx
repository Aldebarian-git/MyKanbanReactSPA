import React from "react";

function Button({ className = "", children, onClick, color, colorValue, colorHover, colorHoverValue }) {
  return (
    <button
      className={`bg-${color}-${colorValue} py-2 px-4 rounded-md cursor-pointer ${className} hover:bg-${colorHover}-${colorHoverValue} `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;

