import { useState, useEffect } from 'react';

// Entities count update
export default function useClock() {

    const [secondsCount, setSecondsCount] = useState(0);
    const [minutesCount, setMinutesCount] = useState(0);
    const [hoursCount, setHoursCount] = useState(0);
    const [clockRunning, setClockRunning] = useState(false);
    const [firstLaunchIndependent, setFirstLaunchIndependent] = useState(false);
    const [startFromCurrentTime, setStartFromCurrentTime] = useState(false);

    // Start/stop clock
    useEffect(() => {
        let clockItnerval;
        if (clockRunning) {
            clockItnerval = setInterval(function () {
                runTime()
            }, 1000)
        }
        else {
            clearInterval(clockItnerval);
        }
        return () => {
            clearInterval(clockItnerval);
        }
        // eslint-disable-next-line 
    }, [clockRunning])

    function runTime() {
        setSecondsCount((prev) => prev >= 59 ? (addMinutes(), prev = 0) : prev + 1);
    }

    function addHours() {
        setHoursCount((prev) => prev >= 23 ? prev = 0 : prev + 1)
    }

    function addMinutes() {
        if (clockRunning) {
            setMinutesCount((prev) => prev >= 59 ? (addHours(), prev = 0) : prev + 1)
        }
        else {
            setMinutesCount((prev) => prev >= 59 ? prev = 0 : prev + 1)
        }
    }

    // Substracting to allow adjustment
    function substractHours() {
        setHoursCount((prev) => prev <= 0 ? prev = 23 : prev - 1)
    }

    function substractMinutes() {
        setMinutesCount((prev) => prev <= 0 ? prev = 59 : prev - 1)
    }

    // Setting seconds to 0 for start if it's not initial independent launch
    function setClock() {
        setClockRunning(!clockRunning);
        if (startFromCurrentTime) {
            if (!firstLaunchIndependent) {
                setFirstLaunchIndependent(true);
            }
            else {
                setSecondsCount(0);
            }
        }
        else {
            setSecondsCount(0);
        }
    }

    // Export time management functions
    return {
        setStartFromCurrentTime,
        secondsCount, setSecondsCount,
        minutesCount, setMinutesCount,
        hoursCount, setHoursCount,
        clockRunning, setClockRunning,
        runTime,
        addHours,
        substractHours,
        addMinutes,
        substractMinutes,
        setClock
    }
}