import {useState, useEffect} from 'react';


export default function useClock() {


    const [secondsCount, setSecondsCount] = useState(0);
    const [minutesCount, setMinutesCount] = useState(0);
    const [hoursCount, setHoursCount] = useState(0);
    const [clockRunning, setClockRunning] = useState(false);

    useEffect(() => {
        // setMinutesCount(initialMin);
        // setHoursCount(initialHour);
    }, []);

    useEffect(() => {
        let clockItnerval;
        if (clockRunning) {
            clockItnerval = setInterval(function () {
                runTime()
                // setSecondsCount((prev) => prev >= 59 ? (addMinutes(), prev = 0) : prev + 1);
            },1000)
        }
        else {
            clearInterval(clockItnerval);
        }
        return () => {
            clearInterval(clockItnerval);
        }
    }, [clockRunning])

    function runTime() {
        setSecondsCount((prev) => prev >= 59 ? (addMinutes(), prev = 0) : prev + 1);
    }

    function addHours() {
        // console.log("h add called")
        setHoursCount((prev) => prev >= 23 ? prev = 0 : prev + 1)
    }

    function substractHours() {
        // console.log("h sub called")
        setHoursCount((prev) => prev <= 0 ? prev = 23 : prev - 1)
    }

    function addMinutes() {
        // console.log("min add called")
        if (clockRunning) {
            setMinutesCount((prev) => prev >= 59 ? (addHours(), prev = 0) : prev + 1)
        }
        else {
            setMinutesCount((prev) => prev >= 59 ? prev = 0 : prev + 1)
        }
    }

    function substractMinutes() {
        // console.log("min sub called")
        setMinutesCount((prev) => prev <= 0 ? prev = 59 : prev - 1)
    }

    function setClock() {
        setClockRunning(!clockRunning);
        setSecondsCount(0);
        // console.log('setclockcalled')
    }

    function alertMessage() {
        alert("Firstly to modify clock you need to stop clock by pressing set button")
    }

    return {
        secondsCount, setSecondsCount,
        minutesCount, setMinutesCount,
        hoursCount, setHoursCount,
        clockRunning, setClockRunning, 
        runTime,
        addHours,
        substractHours,
        addMinutes,
        substractMinutes,
        setClock,
        alertMessage
    }
}