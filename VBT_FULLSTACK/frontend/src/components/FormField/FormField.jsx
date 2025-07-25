import React, { useState } from 'react';
import './FormField.css';

export default function FormField({ 
  label, 
  type, 
  name, 
  placeholder, 
  value, 
  onChange, 
  icon, 
  showPasswordToggle = false,
  error
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (e) => {
    onChange(name, e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className={`form-field ${name}-field ${error ? 'has-error' : ''}`}>
      <label className="field-label" htmlFor={name}>
        {label}
      </label>
      
      <div className="input-container">
        {icon && (
          <div className={`input-icon ${icon}-icon`}>
            {icon === 'email' && (
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M2.83333 2.83333H14.1667C15.0833 2.83333 15.8333 3.58333 15.8333 4.5V12.5C15.8333 13.4167 15.0833 14.1667 14.1667 14.1667H2.83333C1.91667 2.83333 1.16667 3.58333 1.16667 4.5V12.5C1.16667 13.4167 1.91667 14.1667 2.83333 14.1667Z" stroke="#000741" strokeWidth="1.5"/>
                <path d="M15.8333 4.5L8.5 9.33333L1.16667 4.5" stroke="#000741" strokeWidth="1.5"/>
              </svg>
            )}
            {icon === 'password' && (
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
                <path d="M4.25 7.08333V5.66667C4.25 3.36667 6.2 1.41667 8.5 1.41667C10.8 1.41667 12.75 3.36667 12.75 5.66667V7.08333" stroke="#000741" strokeWidth="1.5"/>
                <path d="M8.5 10.2083C9.15 10.2083 9.68333 9.675 9.68333 9.02083C9.68333 8.36667 9.15 7.83333 8.5 7.83333C7.85 7.83333 7.31667 8.36667 7.31667 9.02083C7.31667 9.675 7.85 10.2083 8.5 10.2083Z" stroke="#000741" strokeWidth="1.5"/>
                <rect x="2.83333" y="7.08333" width="11.3333" height="7.08333" rx="1.41667" stroke="#000741" strokeWidth="1.5"/>
              </svg>
            )}
          </div>
        )}
        
        <input
          id={name}
          type={inputType}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleInputChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`form-input ${isFocused || value ? 'focused' : ''} ${error ? 'error' : ''}`}
          required
        />

        {showPasswordToggle && (
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 7s2.5-5 6-5 6 5 6 5-2.5 5-6 5-6-5-6-5z" stroke="#000741" strokeWidth="1.5"/>
                <circle cx="7" cy="7" r="2" stroke="#000741" strokeWidth="1.5"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10.5 3.5L3.5 10.5" stroke="#000741" strokeWidth="1.5"/>
                <path d="M7 2c3.5 0 6 5 6 5a13.16 13.16 0 0 1-1.67 2.04" stroke="#000741" strokeWidth="1.5"/>
                <path d="M1 7s2.5-5 6-5c.55 0 1.08.1 1.6.28" stroke="#000741" strokeWidth="1.5"/>
                <path d="M7 12c-3.5 0-6-5-6-5a13.16 13.16 0 0 1 1.67-2.04" stroke="#000741" strokeWidth="1.5"/>
                <circle cx="7" cy="7" r="2" stroke="#000741" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
        )}
      </div>
      
      <div className={`field-underline ${error ? 'error' : ''}`}></div>
      
      {error && (
        <div className="field-error">
          {error}
        </div>
      )}
    </div>
  );
}
