import tomato from "../../assets/Pomodoro.svg";
import "./Pomodoro.css"

function Pomodoro({ children }) {
    
    return (
        <div className="pomodoroContainer">
            <img src={tomato} alt="Un tomate con el temporizador dentro" />
            {children.length ?
                <div className="clock">
                    <div className="clock-minutes">
                        {children[0]}
                    </div>
                    <div className="clock-dots">
                        :
                    </div>
                    <div className="clock-seconds">
                        {children[1]}
                    </div>
                </div>
                :
                <div className="clockCycle">
                    {children}
                </div>
            }
        </div>
    )
}

export default Pomodoro;