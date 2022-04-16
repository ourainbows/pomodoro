import { useEffect, useState } from 'react';
import useTemporizer from "../../hooks/useTemporizer";

function OneCycleMode({ setPomodoros }) {
    const workTime = 1;
    const relaxTime = 2;
    const longRelaxTime = 2;

    const [timeActive, setTimeActive] = useState("workTime");

    const {
        seconds,
        minutes,
        timeRunning,
        startTime,
        stopTime,
        cycles,
        moreCycles,
        resetCycles,
        restartTime
    } = useTemporizer(workTime);

    const {
        seconds: secondsBreak,
        minutes: minutesBreak,
        timeRunning: timeRunningBreak,
        startTime: startTimeBreak,
        stopTime: stopTimeBreak,
        setMinutes: setMinutesBreak,
        restartTime: restartTimeBreak
    } = useTemporizer(relaxTime);

    const changeTimeActive = () => {
        if (timeActive === "workTime") {
            stopTime()
            startTimeBreak()
            setTimeActive("relaxTime");
        } else {
            stopTimeBreak()
            startTime()
            setTimeActive("workTime");
        }
    }

    useEffect(() => {
        if (!timeRunning && seconds === 0 && minutes === 0) {
            if (timeActive === "workTime") {
                restartTimeBreak()
                setMinutesBreak(longRelaxTime);
                setTimeActive("longRelaxTime");
                moreCycles()
                setPomodoros(pomodoros => pomodoros + 1);
            } else if (timeActive === "longRelaxTime" && secondsBreak === 0 && minutesBreak === 0) {
                restartTime()
                restartTimeBreak()
                setTimeActive("workTime");
                resetCycles()
            }
        } else if (!timeRunningBreak && secondsBreak === 0 && minutesBreak === 0) {
            if (timeActive === "relaxTime") {
                setTimeActive("workTime");
            } 
        }
    }, [timeRunning, timeRunningBreak])

    return (
        <div>
            <div>
                {timeActive == "workTime" ?
                    <div>
                        {minutes.toString().length == 1 ? `0${minutes}` : minutes} :
                        {seconds.toString().length == 1 ? `0${seconds}` : seconds}
                    </div>
                    : <div>
                        {minutesBreak.toString().length == 1 ? `0${minutesBreak}` : minutesBreak} :
                        {secondsBreak.toString().length == 1 ? `0${secondsBreak}` : secondsBreak}
                    </div>}
            </div>
            <div>
                {timeActive == "workTime" ?
                    `Descanso restante:
                     ${minutesBreak.toString().length == 1 ? `0${minutesBreak}` : minutesBreak}:
                     ${secondsBreak.toString().length == 1 ? `0${secondsBreak}` : secondsBreak}` :
                    `Trabajo restante:  
                    ${minutes.toString().length == 1 ? `0${minutes}` : minutes}:
                    ${seconds.toString().length == 1 ? `0${seconds}` : seconds}`
                }
                <br />
                {timeActive == "workTime" ?
                    `Es momento de Trabajar!` :
                    timeActive == "relaxTime" ?
                        `Es momento de descansar!` :
                        `Es momento de tomarte un descanso largo!`
                }
            </div>

            {!timeRunning && !timeRunningBreak ?
                <button onClick={timeActive == "workTime" ? startTime : startTimeBreak}>
                    Iniciar
                </button>
                :
                <>
                    <button onClick={changeTimeActive}>
                        {timeActive == "workTime" ? "Descansar" : "Trabajar"}
                    </button>

                    <button onClick={timeActive == "workTime" ? stopTime : stopTimeBreak}>
                        Pausar
                    </button>
                </>
            }
        </div>
    );
};
export default OneCycleMode
