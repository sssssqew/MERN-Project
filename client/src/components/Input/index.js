import React from "react";

import "./Input.scss";

const Input = ({ name, value, placeholder, onChange }) => {
  return (
    <div className="input-wrap">
      <input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default Input;
