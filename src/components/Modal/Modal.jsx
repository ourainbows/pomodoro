import ReactDOM from 'react-dom'

function Modal({ message, isOpen, onClose, children }) {
    if (!isOpen) return null;
    return ReactDOM.createPortal(
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <span>{message}</span>
                <button onClick={onClose}>Close</button>
            </div>
        </div>,
        document.getElementById("modal"))
}


export default Modal