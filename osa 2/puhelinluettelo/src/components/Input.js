import React from "react";

const Input = ({type, value, onChange, placeholder}) => (
  <div>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default Input;