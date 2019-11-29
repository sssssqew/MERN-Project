import React from "react";

import "./Dropdown.scss";

const Dropdown = ({ show, id, onDelete }) => {
  const dropContainer = show
    ? "dropdown-container display-block"
    : "dropdown-container display-none";
  return (
    <div className={dropContainer}>
      <div className="dropdown-item">Edit</div>
      <div className="dropdown-item" onClick={e => onDelete(e, id)}>
        Delete
      </div>
    </div>
  );
};

export default Dropdown;
