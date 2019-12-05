import React from "react";

import CloseBtnImage from "assets/images/close.png";

import "./Modal.scss";

const Modal = ({ isShow, btnText, onCrud, onClose, children }) => {
  const showHideClassName = isShow
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div className="close-btn" onClick={onClose}>
          <img src={CloseBtnImage} alt="close-btn" />
        </div>
        {children}
        <div className="add-music-btn">
          <button onClick={onCrud}>{btnText} Music</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
