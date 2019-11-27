import React from "react";

import "./Modal.scss";

const Modal = ({ isShow, onClose, children }) => {
  const showHideClassName = isShow
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        {children}
        <div className="close-btn">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
