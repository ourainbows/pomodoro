import { useEffect, useState } from 'react';

import useTemporizer from "../../hooks/useTemporizer";
import Pomodoro from '../Pomodoro/Pomodoro';
import Cycles from '../Cycles/Cycles';
import Message from '../Message/Message';
import Buttons from '../Buttons/Buttons';

function PomodoroMode({ setPomodoros, workTime, relaxTime, longRelaxTime }) {

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

    useEffect( () => {
        if (!timeRunning && seconds === 0 && minutes === 0) {
            if (timeactive === "workTime") {
                moreCycles() 
                if (cycles === 3) { // 3 times because update state is async
                    setMinutes(longRelaxTime);
                    setTimeActive("longRelaxTime");
                    setPomodoros(pomodoros => pomodoros + 1);
                } else {
                    setMinutes(relaxTime);
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
                {minutes.toString().length == 1 ? `0${minutes}` : minutes} 
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
