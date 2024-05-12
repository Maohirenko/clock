import { useState, useEffect, useContext } from "react";
import DigitComponent from "./digit-component";
import classes from './digital-clock.module.css';
import useClock from '../../logic/useClock'
import LongPressButton from "../button-long-press";
import ModalMessage from '../modal';
import { GlobalContext } from "../context";




export default function DigitalClock({ minIncoming = 0, hourIncoming = 0, setMinsDigital, setHoursDigital, runClock, setAllowRun, isEnabled, isIndependent = false, setShowWarning, setWarningOperation
}) {

    let tickInterval;
    const [firstClockLauch, setFirstClockLaunch] = useState(false);
    const [isRunningIndependently, setIsRunningIndependently] = useState(null)

    const clockFunctions = useClock();
    const { secondsCount,
        minutesCount, setMinutesCount,
        hoursCount, setHoursCount,
        clockRunning,
        addHours,
        substractHours,
        addMinutes,
        substractMinutes,
        setClock } = clockFunctions;

    const { isModalShown } = useContext(GlobalContext);
    const [tick, setTick] = useState(false);

    useEffect(() => {

        if (isIndependent) {
            setIsRunningIndependently(true);
        }

        if (runClock) {
            tickInterval = setInterval(function () {
                setTick(prevTick => !prevTick);
            }, 500)
        }
        else {

            clearInterval(tickInterval);
            setTick(false);

        }
        return () => {
            clearInterval(tickInterval);
            setTick(false);
        }
    }, [runClock])



    useEffect(() => {
        setHoursCount(hourIncoming);
        setMinutesCount(minIncoming);
    }, [minIncoming, hourIncoming]);

    useEffect(() => {
        setHoursDigital(hoursCount);
    }, [hoursCount])


    useEffect(() => {
        setMinsDigital(minutesCount);
    }, [minutesCount])



    useEffect(() => {
        if (!firstClockLauch) {
            if (runClock) {
                setFirstClockLaunch(true);
                setClock();
            }
        }
        else {
            setClock();
        }
        if (!runClock && isEnabled) {
            setHoursCount(0);
            setMinutesCount(0);
        }
    }, [runClock]);

    useEffect(() => {

        if (isIndependent) {
            if (isRunningIndependently === true) {
                setClock();
                tickInterval = setInterval(function () {
                    setTick(prevTick => !prevTick);
                }, 500)
            }
            else if (isRunningIndependently === false) {

                clearInterval(tickInterval);
                setTick(false);
                setClock();

            }
        }
        return () => {
            clearInterval(tickInterval);
            setTick(false);
        }
    }, [isRunningIndependently])


    function timeSetting() {
        if (isIndependent) {
            setIsRunningIndependently(prev => !prev);
        }
        else {
            setAllowRun(true);
        }
    }


    return (
        <div className={classes.digitalClockContainer}>
            <div className={classes.roundedBorder}>

                <svg className={classes.svgAlign} height="250" width="360" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="clockStandLeftGradient">
                            <stop className={classes.clockStndLeftGradStop1} offset="0%" />
                            <stop className={classes.clockStndLeftGradStop2} offset="50%" />
                            <stop className={classes.clockStndLeftGradStop3} offset="100%" />
                        </linearGradient>
                        <linearGradient id="clockStandRightGradient">
                            <stop className={classes.clockStndRightGradStop1} offset="0%" />
                            <stop className={classes.clockStndRightGradStop2} offset="50%" />
                            <stop className={classes.clockStndRightGradStop3} offset="100%" />
                        </linearGradient>
                        <linearGradient id="clockFrontFaceLeftGradient">
                            <stop className={classes.clockFrontLeftFaceGradStop1} offset="0%" />
                            <stop className={classes.clockFrontLeftFaceGradStop2} offset="50%" />
                            <stop className={classes.clockFrontLeftFaceGradStop3} offset="100%" />
                        </linearGradient>
                        <linearGradient id="clockFrontFaceCenterGradient">
                            <stop className={classes.clockFrontCenterFaceGradStop1} offset="0%" />
                            <stop className={classes.clockFrontCenterFaceGradStop2} offset="50%" />
                            <stop className={classes.clockFrontCenterFaceGradStop3} offset="100%" />
                        </linearGradient>
                        <linearGradient id="clockFrontFaceRightGradient">
                            <stop className={classes.clockFrontRightFaceGradStop1} offset="0%" />
                            <stop className={classes.clockFrontRightFaceGradStop2} offset="50%" />
                            <stop className={classes.clockFrontRightFaceGradStop3} offset="100%" />
                        </linearGradient>
                        <linearGradient id="clockBezelGradient">
                            <stop className={classes.clockBezelGradStop1} offset="0%" />
                            <stop className={classes.clockBezelGradStop2} offset="50%" />
                            <stop className={classes.clockBezelGradStop3} offset="100%" />
                        </linearGradient>
                        <linearGradient id="clockBezelHorizontalGradient">
                            <stop className={classes.clockBezelHorizontalGradStop1} offset="0%" />
                            <stop className={classes.clockBezelHorizontalGradStop2} offset="50%" />
                            <stop className={classes.clockBezelHorizontalGradStop3} offset="100%" />
                        </linearGradient>
                    </defs>

                    <path className={classes.clockFrontLeftFace} d="M 50 180 q -90 -130 0 -140" strokeWidth="10" />
                    <path className={classes.clockFrontRightFace} d="M 310 180 q 90 -130 0 -140" strokeWidth="10" />
                    <rect className={classes.clockFrontCenterFace} width="262" height="136" x="49" y="44" rx="0" ry="0" />
                    <rect className={classes.clockFrontCenterFace} width="262" height="10" x="49" y="35" rx="0" ry="0" />
                    <rect className={classes.clockFrontCenterFace} width="272" height="10" x="44" y="179" rx="0" ry="0" />
                    {/* {/* <path className={classes.clockBezel} d="M 90 355 l 320 0" stroke="yellow" strokeWidth="16" /> */}
                    {/* <path className={classes.clockBezel} d="M 99 160 l 302 0" stroke="yellow" strokeWidth="10" /> */}
                    {/* <!-- Holder --> */}
                    <path id="leftStand" className={classes.clockStandLeft} d="M 76 190 q -140 30 0 10" strokeWidth="4" />
                    <path id="rightStand" className={classes.clockStandRight} d="M 74 190 q 140 30 0 10" strokeWidth="4" />
                    <use href="#leftStand" x="210" fill="white" stroke="red" />
                    <use href="#rightStand" x="210" fill="white" stroke="red" />
                </svg>
                <div className={classes.controlButtons}>
                    <div>
                        <LongPressButton buttonText={'H+'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={addHours} isClockRunning={clockRunning} isEnabledButton={isEnabled} />
                    </div>
                    <div>
                        <LongPressButton buttonText={'H-'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={substractHours} isClockRunning={clockRunning} isEnabledButton={isEnabled} />
                    </div>
                    <div>
                        <LongPressButton buttonText={'M+'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={addMinutes} isClockRunning={clockRunning} isEnabledButton={isEnabled} />
                    </div>
                    <div>
                        <LongPressButton buttonText={'M-'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={substractMinutes} isClockRunning={clockRunning} isEnabledButton={isEnabled} />
                    </div>
                    <div>
                        <button style={isModalShown ? { pointerEvents: "none" } : null} onClick={isEnabled ? timeSetting : null}>SET</button>
                    </div>
                </div>

                <div className={classes.clockContainer}>

                    <DigitComponent digit={hoursCount < 10 ? "0" : ("" + hoursCount)[0]} />
                    <DigitComponent digit={hoursCount < 10 ? ("" + hoursCount)[0] : ("" + hoursCount)[1]} />
                    <span className={classes.separator} style={{ marginTop: "-8px", marginBottom: "", backgroundColor: "", fontSize: "72px", visibility: `${tick ? "visible" : "hidden"}` }}>:</span>
                    <DigitComponent digit={minutesCount < 10 ? "0" : ("" + minutesCount)[0]} />
                    <DigitComponent digit={minutesCount < 10 ? ("" + minutesCount)[0] : ("" + minutesCount)[1]} />
                    <DigitComponent digit={secondsCount < 10 ? "0" : ("" + secondsCount)[0]} isSeconds={true} />
                    <DigitComponent digit={secondsCount < 10 ? ("" + secondsCount)[0] : ("" + secondsCount)[1]} isSeconds={true} />
                </div>

            </div>
        </div>
    )
}


