import "./Buttons.css";

function Buttons({ children }) {
    return (
        <>
            {children.props.children.length > 2 ?
                <div className="button-container">
                    {children}
                </div> :
                <div className="button-container buttons-cycle">
                    {children}
                </div>
            }
        </>
    )
}

export default Buttons;