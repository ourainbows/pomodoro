import "./PomodoroCounter.css";

function PomodoroCounter({ children, pomodoros }) {
    return (
        <div className="pomodoroCounter">
            {`Pomodoros:  ${pomodoros}`}
        </div>
    )
}

export default PomodoroCounter;