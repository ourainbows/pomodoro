import "./Message.css"

function Message({ children }) {
    return (
        <div className="message">
            {children}
        </div>
    )
}

export default Message;