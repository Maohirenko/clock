import { useState, useEffect } from "react";
import DigitComponent from "./digit-component";
import classes from './digital-clock.module.css';



export default function DigitalClock() {

    const [time, setTime] = useState(null);
    const [tick, setTick] = useState(false);

    useEffect(() => {
        const clockItnerval = setInterval(function () {
            setTime(new Date());
        }, 1000)
        return () => {
            clearInterval(clockItnerval);
        }
    }, [])

    useEffect(() => {
        const tickItnerval = setInterval(function () {
            setTick(!tick)
        }, 500)

        return () => {
            clearInterval(tickItnerval);
        }
    }, [tick])

    console.log(tick)
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

                    <path className={classes.clockFrontLeftFace} d="M 100 360 q -100 -200 0 -200" stroke-width="10" />
                    <path className={classes.clockFrontRightFace} d="M 400 360 q 100 -200 0 -200" stroke-width="10" />
                    <rect className={classes.clockFrontCenterFace} width="302" height="200" x="99" y="160" rx="0" ry="0"/>
                    <rect className={classes.clockFrontCenterFace} width="302" height="10" x="99" y="155" rx="0" ry="0"/>
                    <rect className={classes.clockFrontCenterFace} width="302" height="10" x="99" y="350" rx="0" ry="0"/>
                    {/* <path className={classes.clockBezel} d="M 90 355 l 320 0" stroke="yellow" stroke-width="16" />
                    <path className={classes.clockBezel} d="M 99 160 l 302 0" stroke="yellow" stroke-width="10" /> */}
                    {/* <!-- Holder --> */}
                    <path className={classes.clockStandLeft} d="M 101 360 q -140 30 0 10" stroke-width="4" />
                    <path className={classes.clockStandRight} d="M 99 360 q 140 30 0 10" stroke-width="4" />
                    <path className={classes.clockStandLeft} d="M 401 360 q -140 30 0 10" stroke-width="4" />
                    <path className={classes.clockStandRight} d="M 399 360 q 140 30 0 10" stroke-width="4" />
                    Sorry, your browser does not support inline SVG.
                </svg>
                <div className={classes.controlButtons}>
                    <span>
                        <button>H+</button>
                    </span>
                    <span>
                        <button>H-</button>
                    </span>
                    <span>
                        <button>M+</button>
                    </span>
                    <span>
                        <button>M-</button>
                     </span>
                    <span>
                        <button>SET</button>
                    </span>
                </div>
                {
                    time ?

                    
                        <div className={classes.clockContainer}>

                            <DigitComponent digit={time.getHours() < 10 ? ("0" + time.getHours())[0] : ("" + time.getHours())[0]} />
                            <DigitComponent digit={time.getHours() < 10 ? ("0" + time.getHours())[1] : ("" + time.getHours())[1]} />
                            <span className={classes.separator} style={{marginTop:"-8px", marginBottom:"", backgroundColor:"", fontSize: "72px", visibility: `${tick ? "visible" : "hidden"}` }}>:</span>
                            <DigitComponent digit={time.getMinutes() < 10 ? ("0" + time.getMinutes())[0] : ("" + time.getMinutes())[0]} />
                            <DigitComponent digit={time.getMinutes() < 10 ? ("0" + time.getMinutes())[1] : ("" + time.getMinutes())[1]} />
                            <DigitComponent digit={time.getSeconds() < 10 ? ("0" + time.getSeconds())[0] : ("" + time.getSeconds())[0]} isSeconds={true} />
                            <DigitComponent digit={time.getSeconds() < 10 ? ("0" + time.getSeconds())[1] : ("" + time.getSeconds())[1]} isSeconds={true} />
                        </div>
                        : null
                }

            </div>
        </div>
    )
}