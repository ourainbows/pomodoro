import { useEffect, useState } from 'react';
import './Pomodoro.css'
import useTemporizer from "./useTemporizer";

function Pomodoro() {
    const workTime = 1;
    const relaxTime = 2;
    const longRelaxTime = 3;

    const [timeactive, setTimeActive] = useState("workTime");

    const {
        seconds,
        minutes,
        timeRunning,
        startTime,
        stopTime,
        cycles,
        setMinutes,
        moreCycles,
        relax,
        resetCycles
    } = useTemporizer(workTime);

    useEffect(() => {
        if (!timeRunning && seconds === 0 && minutes === 0) {
            if (timeactive === "workTime") {
                if (cycles === 4) {
                    setMinutes(longRelaxTime);
                    setTimeActive("longRelaxTime");
                } else {
                    setMinutes(relaxTime);
                    moreCycles()
                    setTimeActive("relaxTime");
                }
            } else if (timeactive === "relaxTime") {
                setMinutes(workTime)
                setTimeActive("workTime");
            } else {
                setMinutes(workTime)
                setTimeActive("workTime");
                resetCycles()
            }
        }
    }, [timeRunning])



    return (
        <div className='container'>
            <div>
                {minutes.toString().length == 1 ? `0${minutes}` : minutes} :
                {seconds.toString().length == 1 ? `0${seconds}` : seconds}
            </div>
            <div>
                {timeactive == "workTime" ? "Time to Work: " : timeactive == "relaxTime" ? "Time to Relax" : "Time to Long Relax"}
            </div>
            {!timeRunning ?
                <button onClick={startTime}>
                    Iniciar
                </button>
                :
                <button onClick={stopTime}>
                    Pausar
                </button>
            }
        </div>
    );
};
export default Pomodoro
