import React from "react";
import ReactDOM from "react-dom";
import Style from "./index.module.css";

const Modal = ({ isOpen,onClose, children }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!isOpen) return null;
  return ReactDOM.createPortal(
    <div className={Style.modal_overlay} onClick={onClose}>
      <div className={Style.modal_contant} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
