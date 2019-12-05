import React from "react";

import "./Dropdown.scss";

const Dropdown = ({ showDropdown, id, onShow }) => {
  const dropContainer = showDropdown
    ? "dropdown-container display-block"
    : "dropdown-container display-none";
  return (
    <div className={dropContainer}>
      <div className="dropdown-item" onClick={e => onShow(e, id, "edit")}>
        Edit
      </div>
      <div className="dropdown-item" onClick={e => onShow(e, id, "delete")}>
        Delete
      </div>
    </div>
  );
};

export default Dropdown;
