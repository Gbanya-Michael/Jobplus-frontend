import React from "react";
import "./confirmation_modal.scss";

const Confirmationmodal = ({ isOpen, onClose, onAccept, text }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop">
        <div className="modal-content">
          <p>{text}</p>
          <div className="modal-actions">
            <button className="btn-accept" onClick={onAccept}>
              Accept
            </button>
            <button className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Confirmationmodal;
