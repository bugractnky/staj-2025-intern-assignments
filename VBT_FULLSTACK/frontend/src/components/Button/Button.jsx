import React from 'react';
import './Button.css';

export default function Button({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  fullWidth = false, 
  disabled = false,
  onClick 
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full-width' : ''} ${disabled ? 'btn-disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
