import tomato from "../../assets/Pomodoro.svg";
import "./Pomodoro.css"

function Pomodoro({ children }) {
    return (
        <div className="pomodoroContainer">
            <img src={tomato} alt="Un tomate con el temporizador dentro" />
            <div className="clock">
                <div className="clock-minutes">
                    {children[0]}
                </div>
                <div className="clock-dots">
                    {children[1]}
                </div>
                <div className="clock-seconds">
                    {children[2]}
                </div>
            </div>
        </div>
    )
}

export default Pomodoro;