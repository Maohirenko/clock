import { useState, useEffect, useContext } from "react";
import DigitComponent from "./digit-component";
import classes from './digital-clock.module.css';
import useClock from '../../logic/useClock'
import LongPressButton from "../button-long-press";



export default function DigitalClock({minIncoming = 0, hourIncoming = 0, setHoursDigital, setMinsDigital}) {

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


    const [tick, setTick] = useState(false);

    useEffect(() => {
        setHoursCount(hourIncoming);
        setMinutesCount(minIncoming);
    }, []);

    useEffect(()=> {
        setHoursDigital(hoursCount)
    }, [hoursCount]);

    useEffect(()=> {
        setMinsDigital(minutesCount)
    }, [minutesCount]);


    useEffect(() => {
        let tickItnerval;
        if (clockRunning) {
            tickItnerval = setInterval(function () {
                setTick(!tick)
            }, 500)
        }
        return () => {
            clearInterval(tickItnerval);
        }
    }, [tick, clockRunning])


    return (
        <div className={classes.digitalClockContainer}>
            <div className={classes.roundedBorder}>

                <svg className={classes.svgAlign} height="500" width="500" xmlns="http://www.w3.org/2000/svg">
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
                    </defs>

                    <path className={classes.clockFrontLeftFace} d="M 100 360 q -100 -200 0 -200" strokeWidth="10" />
                    <path className={classes.clockFrontRightFace} d="M 400 360 q 100 -200 0 -200" strokeWidth="10" />
                    <rect className={classes.clockFrontCenterFace} width="302" height="200" x="99" y="160" rx="0" ry="0" />
                    <rect className={classes.clockFrontCenterFace} width="302" height="10" x="99" y="155" rx="0" ry="0" />
                    <rect className={classes.clockFrontCenterFace} width="302" height="10" x="99" y="350" rx="0" ry="0" />
                    {/* <path className={classes.clockBezel} d="M 90 355 l 320 0" stroke="yellow" strokeWidth="16" />
                    <path className={classes.clockBezel} d="M 99 160 l 302 0" stroke="yellow" strokeWidth="10" /> */}
                    {/* <!-- Holder --> */}
                    <path className={classes.clockStandLeft} d="M 101 360 q -140 30 0 10" strokeWidth="4" />
                    <path className={classes.clockStandRight} d="M 99 360 q 140 30 0 10" strokeWidth="4" />
                    <path className={classes.clockStandLeft} d="M 401 360 q -140 30 0 10" strokeWidth="4" />
                    <path className={classes.clockStandRight} d="M 399 360 q 140 30 0 10" strokeWidth="4" />
                    Sorry, your browser does not support inline SVG.
                </svg>
                <div className={classes.controlButtons}>
                    <div>
                        <LongPressButton buttonText={'H+'} clockModifier={addHours} isClockRunning={clockRunning} />
                    </div>
                    <div>
                        <LongPressButton buttonText={'H-'} clockModifier={substractHours} isClockRunning={clockRunning} />
                    </div>
                    <div>
                        <LongPressButton buttonText={'M+'} clockModifier={addMinutes} isClockRunning={clockRunning} />
                    </div>
                    <div>
                        <LongPressButton buttonText={'M-'} clockModifier={substractMinutes} isClockRunning={clockRunning} />
                    </div>
                    <div>
                        <button onClick={setClock}>SET</button>
                    </div>
                </div>
                {/* {
                    time ? */}


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


