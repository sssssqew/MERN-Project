import React from "react";

import "./Dropdown.scss";

const Dropdown = ({ showDropdown, children }) => {
  console.log("dropdown render...");
  const dropContainer = showDropdown
    ? "dropdown-container display-block"
    : "dropdown-container display-none";
  return <div className={dropContainer}>{children}</div>;
};

export default Dropdown;
