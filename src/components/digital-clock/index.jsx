import { useState, useEffect, useCallback } from "react";
import DigitComponent from "./digit-component";
import classes from './digital-clock.module.css';
import useClock from '../../logic/useClock'




export default function DigitalClock() {

    const clockFunctions = useClock();
    const { secondsCount, setSecondsCount,
        minutesCount, setMinutesCount,
        hoursCount, setHoursCount,
        clockRunning, setClockRunning,
        runTime,
        addHours,
        substractHours,
        addMinutes,
        substractMinutes,
        setClock,
        alertMessage } = clockFunctions;


    const [tick, setTick] = useState(false);
    
    // const [secsCnt, setSecCnt] = useState(0);
    // const [minsCnt, setMinCnt] = useState(0);
    // const [hoursCnt, setHourCnt] = useState(0);


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


    console.log(minutesCount)
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
                        <button onClick={clockRunning ? alertMessage : addHours}>H+</button>
                        {/* <button onClick={addHours}>H+</button> */}
                    </div>
                    <div>
                        <button onClick={clockRunning ? alertMessage : substractHours}>H-</button>
                    </div>
                    <div>
                        <button onClick={clockRunning ? alertMessage : addMinutes}>M+</button>
                    </div>
                    <div>
                        <button onClick={clockRunning ? alertMessage : substractMinutes}>M-</button>
                    </div>
                    <div>
                        <button onClick={setClock}>SET</button>
                    </div>
                </div>
                {/* {
                    time ? */}


                                <div className={classes.clockContainer}>

                    <DigitComponent digit={hoursCount < 10 ? "0"  : ("" + hoursCount)[0]} />
                    <DigitComponent digit={hoursCount < 10 ? ("" + hoursCount)[0] : ("" + hoursCount)[1]}  />
                    <span className={classes.separator} style={{ marginTop: "-8px", marginBottom: "", backgroundColor: "", fontSize: "72px", visibility: `${tick ? "visible" : "hidden"}` }}>:</span>
                    <DigitComponent digit={minutesCount < 10 ? "0"  : ("" + minutesCount)[0]} />
                    <DigitComponent digit={minutesCount < 10 ? ("" + minutesCount)[0] : ("" + minutesCount)[1]}  />
                    <DigitComponent digit={secondsCount < 10 ? "0"  : ("" + secondsCount)[0]} isSeconds={true} />
                    <DigitComponent digit={secondsCount < 10 ? ("" + secondsCount)[0] : ("" + secondsCount)[1]} isSeconds={true} />
                </div>

            </div>
        </div>
    )
}



// Array.prototype.sameStructureAs = function (other) {
//     // Return 'true' if and only if 'other' has the same
//     // nesting structure as 'this'.
//     //     console.log(this)
//     let ans = true;
//     for (let i = 0; i < this.length; i++) {
//         //     console.log(this[i].typeof())
//         if (Array.isArray(this[i])) {
//             if (Array.isArray(other[i])) {
//                 console.log(this[i] + "this " + this[i].length + other[i] + " other " + other[i].length)
//                 if (this[i].length !== other[i].length) {
//                     //       console.log("this " + this[i].length + " other " + other[i].length)
//                     ans = false;
//                     //       return;
//                 }
//             }
//             else {
//                 ans = false;
//             }
//         }
//     }
//     return ans;
//     // Note: You are given a function isArray(o) that returns
//     // whether its argument is an array.
// };
