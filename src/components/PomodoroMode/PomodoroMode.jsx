import { useEffect, useState } from 'react';

import useTemporizer from "../../hooks/useTemporizer";
import Pomodoro from '../Pomodoro/Pomodoro';
import Cycles from '../Cycles/Cycles';
import Message from '../Message/Message';
import Buttons from '../Buttons/Buttons';

function PomodoroMode({ setPomodoros }) {
    const workTime = 1;
    const relaxTime = 1;
    const longRelaxTime = 1;

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
                    setPomodoros(pomodoros => pomodoros + 1);
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
        <>
            <Pomodoro>
                {minutes.toString().length == 1 ? `0${minutes}` : minutes} :
                {seconds.toString().length == 1 ? `0${seconds}` : seconds}
            </Pomodoro>
            <Cycles cyclesCount={cycles} quantity={4} />

            <Message>
                <p>
                    {timeactive == "workTime" ?
                        `Trabaja durante ${workTime} ${workTime > 1 ? "minutos" : "minuto"}` :
                        timeactive == "relaxTime" ?
                            "Tomate un pequeño descanso" :
                            "Es hora de un largo descanso"}
                </p>
            </Message>
            <Buttons>
                {!timeRunning ?
                    <button onClick={startTime}>
                        Iniciar
                    </button>
                    :
                    <button onClick={stopTime}>
                        Pausar
                    </button>
                }
            </Buttons>
        </>
    );
};
export default PomodoroMode
