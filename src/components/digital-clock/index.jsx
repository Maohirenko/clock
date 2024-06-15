import { useState, useEffect, useContext } from "react";
import DigitComponent from "./digit-component";
import classes from './digital-clock.module.css';
import useClock from '../../logic/useClock'
import LongPressButton from "../button-long-press";
import { GlobalContext } from "../context";
import ClockBodyGradients from "./digit-component/gradients/clock-body-gradient/";
import { t } from "i18next";


export default function DigitalClock({ isStartFromCurrentTime = false, secondsIncoming = 0, minIncoming = 0, hourIncoming = 0, setMinsDigital, setHoursDigital, runClock, setAllowRun, isEnabled, isIndependent = false, setShowWarning, setWarningOperation
}) {

    // Interval to tick clock separator
    let tickInterval;
    const [tick, setTick] = useState(false);
    const [isRunningIndependently, setIsRunningIndependently] = useState(null)

    const [firstClockLauch, setFirstClockLaunch] = useState(false);
    const { isModalShown } = useContext(GlobalContext);

    // Functions to maintain clock run
    const clockFunctions = useClock();
    const { setStartFromCurrentTime,
        secondsCount, setSecondsCount,
        minutesCount, setMinutesCount,
        hoursCount, setHoursCount,
        clockRunning,
        addHours,
        substractHours,
        addMinutes,
        substractMinutes,
        setClock } = clockFunctions;

    // Handle tick
    useEffect(() => {
        if (isIndependent) {
            setIsRunningIndependently(true);
        }
        if (runClock) {
            // eslint-disable-next-line
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

    // Handle tick for independent run
    useEffect(() => {
        if (isIndependent) {
            if (isRunningIndependently === true) {
                setClock();
                // eslint-disable-next-line
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

    // Setting clock
    useEffect(() => {
        setHoursCount(hourIncoming);
        setMinutesCount(minIncoming);
        setSecondsCount(secondsIncoming);
        // eslint-disable-next-line
    }, [minIncoming, hourIncoming, secondsIncoming]);

    // Modify hours for comparison
    useEffect(() => {
        setHoursDigital(hoursCount);
        // eslint-disable-next-line
    }, [hoursCount])

    // Modify minutes for comparison
    useEffect(() => {
        setMinsDigital(minutesCount);
        // eslint-disable-next-line
    }, [minutesCount])

    // Check if runnin separately to run from non-zero seconds
    useEffect(() => {
        setStartFromCurrentTime(isStartFromCurrentTime)
        // eslint-disable-next-line
    }, [isStartFromCurrentTime])

    // Start / stop
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
        // eslint-disable-next-line
    }, [runClock]);

    // Check start possibility
    function timeSetting() {
        if (isIndependent) {
            setIsRunningIndependently(prev => !prev);
        }
        else {
            setAllowRun(true);
        }
    }

    // Notify if set pressed on wrong clock
    function wrongClockWarningShow() {
        setShowWarning(true);
        setWarningOperation(t('wrongClock', { wrong: t('digitalLabel'), right: t('analogueLabel') }));
    }


    return (
        <div className={classes.digitalClockContainer}>
            <div className={classes.svgContainer}>
                {/* Drawing svg clock body */}
                <svg className={classes.clockBody} height="250" width="320" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision">
                    {/* Defining gradients for svg */}
                    <ClockBodyGradients />
                    {/* Drawing parts of clock */}
                    <path className={classes.clockFrontLeftFace} d="M 50 180 Q 10 165, 5 105 T 50 43" strokeWidth="8" />
                    <path className={classes.clockFrontRightFace} d="M 270 180 Q 310 165, 315 105 T 270 43" strokeWidth="8" />
                    <rect className={classes.clockFrontCenterFace} width="222" height="136" x="49" y="44" rx="0" ry="0" />
                    <rect className={classes.clockFrontCenterFaceBezel} width="222" height="8" x="49" y="39" rx="1" ry="2" />
                    <rect className={classes.clockFrontCenterFaceBezel} width="224" height="11" x="48" y="174" rx="10" ry="2"/>
                    <path id="leftStand" className={classes.clockStandLeft} d="M 76 186 q -140 30 0 10" strokeWidth="4" />
                    <path id="rightStand" className={classes.clockStandRight} d="M 74 186 q 140 30 0 10" strokeWidth="4" />
                    <use href="#leftStand" x="170" />
                    <use href="#rightStand" x="170" />
                </svg>
                {/* Controllers */}
                <div className={classes.controlButtons}>
                    <div>
                        <LongPressButton buttonText={'H+'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={addHours} isClockRunning={clockRunning} isEnabledButton={isEnabled} componentCall={"digital"} />
                    </div>
                    <div>
                        <LongPressButton buttonText={'H-'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={substractHours} isClockRunning={clockRunning} isEnabledButton={isEnabled} componentCall={"digital"} />
                    </div>
                    <div>
                        <LongPressButton buttonText={'M+'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={addMinutes} isClockRunning={clockRunning} isEnabledButton={isEnabled} componentCall={"digital"} />
                    </div>
                    <div>
                        <LongPressButton buttonText={'M-'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={substractMinutes} isClockRunning={clockRunning} isEnabledButton={isEnabled} componentCall={"digital"} />
                    </div>
                    <div>
                        <button style={isModalShown ? { pointerEvents: "none" } : null} onClick={isEnabled ? timeSetting : wrongClockWarningShow}>SET</button>
                    </div>
                </div>
                {/* Display time */}
                <div className={classes.clockContainer}>
                    <DigitComponent digit={hoursCount < 10 ? "0" : ("" + hoursCount)[0]} />
                    <DigitComponent digit={hoursCount < 10 ? ("" + hoursCount)[0] : ("" + hoursCount)[1]} />
                    <span className={classes.separator} style={{ visibility: `${tick ? "visible" : "hidden"}` }}>:</span>
                    <DigitComponent digit={minutesCount < 10 ? "0" : ("" + minutesCount)[0]} />
                    <DigitComponent digit={minutesCount < 10 ? ("" + minutesCount)[0] : ("" + minutesCount)[1]} />
                    <DigitComponent digit={secondsCount < 10 ? "0" : ("" + secondsCount)[0]} isSeconds={true} />
                    <DigitComponent digit={secondsCount < 10 ? ("" + secondsCount)[0] : ("" + secondsCount)[1]} isSeconds={true} />
                </div>
            </div>
        </div>
    )
}


