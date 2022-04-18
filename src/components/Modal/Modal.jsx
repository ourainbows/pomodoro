import ReactDOM from 'react-dom'
import "./Modal.css";
import close from "../../assets/close.svg";

function Modal({ message, isOpen, onClose, children }) {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span>{children}</span>
                <button onClick={onClose} className="closeModal">
                    <img src={close} alt="boton parar cerrar el modal" />
                </button>
            </div>
        </div>,
        document.getElementById("modal"))
}


export default Modal