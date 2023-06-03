import React from 'react';
import ReactDOM from 'react-dom';
import { useRef } from 'react';

const Modal =({ message, isOpen, onClose, children, callback })=> {
  const contactRef = useRef();

  return isOpen ? ReactDOM.createPortal(
    <div className="modal">
      <div className="modal-inner">
        <button className="close-modal" onClick={() => onClose(prev => !prev)}>Close modal</button>
        <label>
          Введите номер контакта:
          <input type="text" name="" id="" ref={contactRef}/>
        </label>
        <button onClick={() => {
            const regex = /^([0-9])+?$/g;
            if (contactRef.current.value.match(regex)) {
              callback(contactRef.current.value);
              onClose(prev => !prev);
            };
          }
        }>Создать чат</button>
      </div>
    </div>
    
    
    , document.body) : null;
}
  
export default Modal;
