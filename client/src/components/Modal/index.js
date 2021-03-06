import React from "react";

import CloseBtnImage from "assets/images/close.png";

import "./Modal.scss";

const Modal = ({ isShow, titleText, btnText, onSubmit, onClose, children }) => {
  console.log("modal render...");
  const showHideClassName = isShow
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <div className="modal-main">
        <div className="close-btn" onClick={onClose}>
          <img src={CloseBtnImage} alt="close-btn" />
        </div>
        <p className="title">{titleText}</p>
        {children}
        <div className="add-music-btn">
          <button onClick={onSubmit}>{btnText}</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
