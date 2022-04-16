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
    const restartSecond = () => setSeconds(2);
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
                lessSecond();
            }, 1000);
            if (seconds == 0) {
                lessMinute();
                restartSecond();
                if (minutes === 0) {
                    stopTime();
                    setMinutes(0);  
                    setSeconds(0);

                    setTimeout(function () {
                        audio.play();
                    }, 150);
                }
            }
            return () => clearInterval(interval);
        }
    });
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