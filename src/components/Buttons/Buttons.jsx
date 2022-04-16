import "./Buttons.css";

function Buttons({ children }) {
    console.log(children.length);
    return (
        <>
            {!children.length ?
                <div className="button-container">
                    {children}
                </div> :
                <div className="button-container buttons-cycle">
                    {children[0]}
                    {children[1]}
                </div>
            }
        </>
    )
}

export default Buttons;