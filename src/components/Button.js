import React from 'react';

const Button = ({ title, className, color, onClick }) => {
  return (
    <button
      className={className}
      style={{backgroundColor: color}}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button;
