import React from "react";

import "./Input.scss";

const Input = ({ placeholder }) => {
  return (
    <div className="input-wrap">
      <input placeholder={placeholder} />
    </div>
  );
};

export default Input;
