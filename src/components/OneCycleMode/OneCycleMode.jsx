import { useEffect, useState } from 'react';
import useTemporizer from "../../hooks/useTemporizer";
import Pomodoro from '../Pomodoro/Pomodoro';
import Cycles from '../Cycles/Cycles';
import Message from '../Message/Message';
import Buttons from '../Buttons/Buttons';
import pause from '../../assets/pause.svg';

function OneCycleMode({ setPomodoros }) {
    const workTime = 100;
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
        <>
            <Pomodoro>
                {timeActive == "workTime" ?
                    <>
                        <div>
                            {minutes.toString().length == 1 ? `0${minutes}` : minutes}
                        </div>
                        <div>:</div>
                        <div>
                            {seconds.toString().length == 1 ? `0${seconds}` : seconds}
                        </div>
                    </>
                    :
                    <>
                        <div>
                            {minutesBreak.toString().length == 1 ? `0${minutesBreak}` : minutesBreak}
                        </div>
                        <div>:</div>
                        <div>
                            {secondsBreak.toString().length == 1 ? `0${secondsBreak}` : secondsBreak}
                        </div>
                    </>}
            </Pomodoro>
            <Cycles cyclesCount={cycles} quantity={1} />
            <Message>
                {timeActive == "workTime" ?
                    `Es momento de Trabajar!` :
                    timeActive == "relaxTime" ?
                        `Es momento de descansar!` :
                        `Es momento de tomarte un descanso largo!`
                }<br />
                {timeActive == "workTime" ?
                    `Descanso restante:
                     ${minutesBreak.toString().length == 1 ?
                        `0${minutesBreak}` : minutesBreak}:${secondsBreak.toString().length == 1 ?
                            `0${secondsBreak}` : secondsBreak}` :
                    `Trabajo restante:  
                    ${minutes.toString().length == 1 ?
                        `0${minutes}` : minutes}:${seconds.toString().length == 1 ?
                            `0${seconds}` : seconds}`
                }
            </Message>

            <Buttons>
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
                            <img src={pause} alt="pause" />
                        </button>
                    </>
                }
            </Buttons>
        </>
    );
};
export default OneCycleMode
