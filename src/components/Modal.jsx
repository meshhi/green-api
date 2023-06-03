import React from 'react';
import ReactDOM from 'react-dom';

const JSX_MODAL = (onClose) => (
  <>
    <div className="modal">
      <button className="close-modal" onClick={() => onClose(prev => !prev)}>Close modal</button>
      <h1>THIS IS SOME TEXT IN THE MODAL</h1>
    </div>
  </>
);

const Modal =({ message, isOpen, onClose, children })=> {
  return isOpen ? ReactDOM.createPortal(JSX_MODAL(onClose), document.body) : null;
}
  
export default Modal;
