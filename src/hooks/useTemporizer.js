import { useEffect, useState } from 'react'
import notification from "../assets/notification.wav";


const useTemporizer = (time) => {
    const audio = new Audio(notification);
    
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(time)
    
    const [timeRunning, setTimeRunning] = useState(false);
    const [cycles, setCycles] = useState(0);

    const lessSecond = () => setSeconds(current => current - 1);
    const lessMinute = () => setMinutes(current => current - 1);
    const restartSecond = () => setSeconds(59);
    const startTime = () => setTimeRunning(true);
    const stopTime = () => setTimeRunning(false);
    const moreCycles = () => setCycles(current => current + 1);
    const resetCycles = () => setCycles(0);
    const restartTime = () => {
        setSeconds(0);
        setMinutes(time);
        setTimeRunning(false);
    }

    useEffect(() => {
        if (timeRunning) {
            const interval = setInterval(() => {
                if (seconds > 0) {
                    lessSecond();
                }
                if (seconds === 0) {
                    if (minutes === 0) {
                        stopTime();

                        setTimeout(function () {
                            audio.play();
                        }, 150);
                    }
                    else {
                        lessMinute();
                        restartSecond();
                    }
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    });
    useEffect(() => { 
        setMinutes(time);
    }, [time]);
    return {
        seconds,
        minutes,
        timeRunning,
        startTime,
        stopTime,
        cycles,
        setMinutes,
        moreCycles,
        resetCycles,
        restartSecond,
        restartTime
    };
}

export default useTemporizer;