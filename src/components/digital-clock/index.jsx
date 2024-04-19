import { useState, useEffect, useContext } from "react";
import DigitComponent from "./digit-component";
import classes from './digital-clock.module.css';
import useClock from '../../logic/useClock'
import LongPressButton from "../button-long-press";
import ModalWarning from '../modal';



export default function DigitalClock({minIncoming = 0, hourIncoming = 0, runClock, isEnabled}) {


    const [firstClockLauch, setFirstClockLaunch] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [warningOperation, setWarningOperation] = useState(null);

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
    }, [hourIncoming, minIncoming]);


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
    }, [runClock]);

    function closeModal() {
        setShowWarning(false);
    }

    console.log(hourIncoming, minIncoming)
    console.log(hoursCount, minutesCount)
    return (
        <div className={classes.digitalClockContainer}>
            <div className={classes.roundedBorder}>

                <svg className={classes.svgAlign} height="500" width="360" xmlns="http://www.w3.org/2000/svg">
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

                    <path className={classes.clockFrontLeftFace} d="M 50 300 q -90 -130 0 -140" strokeWidth="10" />
                    <path className={classes.clockFrontRightFace} d="M 310 300 q 90 -130 0 -140" strokeWidth="10" />
                    <rect className={classes.clockFrontCenterFace} width="262" height="136" x="49" y="164" rx="0" ry="0" />
                    <rect className={classes.clockFrontCenterFace} width="262" height="10" x="49" y="155" rx="0" ry="0" />
                    <rect className={classes.clockFrontCenterFace} width="272" height="10" x="44" y="299" rx="0" ry="0" /> 
                    {/* {/* <path className={classes.clockBezel} d="M 90 355 l 320 0" stroke="yellow" strokeWidth="16" /> */}
                    {/* <path className={classes.clockBezel} d="M 99 160 l 302 0" stroke="yellow" strokeWidth="10" /> */}
                    {/* <!-- Holder --> */}
                    <path className={classes.clockStandLeft} d="M 76 310 q -140 30 0 10" strokeWidth="4" />
                    <path className={classes.clockStandRight} d="M 74 310 q 140 30 0 10" strokeWidth="4" />
                    <path className={classes.clockStandLeft} d="M 286 310 q -140 30 0 10" strokeWidth="4" />
                    <path className={classes.clockStandRight} d="M 284 310 q 140 30 0 10" strokeWidth="4" />
                    Sorry, your browser does not support inline SVG.
                </svg>
                <div className={classes.controlButtons}>
                    <div>
                        <LongPressButton buttonText={'H+'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={addHours} isClockRunning={clockRunning} isEnabledButton={isEnabled}/>
                    </div>
                    <div>
                        <LongPressButton buttonText={'H-'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={substractHours} isClockRunning={clockRunning} isEnabledButton={isEnabled}/>
                        {/* <LongPressButton buttonText={'H-'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={substractHours} isClockRunning={clockRunning} /> */}
                    </div>
                    <div>
                        <LongPressButton buttonText={'M+'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={addMinutes} isClockRunning={clockRunning} isEnabledButton={isEnabled}/>
                    </div>
                    <div>
                        <LongPressButton buttonText={'M-'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={substractMinutes} isClockRunning={clockRunning} isEnabledButton={isEnabled}/>
                    </div>
                    <div>
                        <button onClick={isEnabled ?  setClock : null}>SET</button>
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
            {
                showWarning ?
                    <ModalWarning onClose={closeModal} warningOperation={warningOperation} />
                    : null
            }
        </div>
    )
}


