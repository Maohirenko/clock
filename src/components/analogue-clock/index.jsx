import { useContext, useEffect, useState } from 'react';
import classes from './analogue-clock.module.css';
import Dial from './dial';
import useClock from '../../logic/useClock'
import LongPressButton from '../button-long-press';
import { GlobalContext } from '../context';

export default function AnalogueClock({ isStartFromCurrentTime = false, secondsIncoming = 0, minIncoming = 0, hourIncoming = 0, setMinsAnalogue, setHoursAnalogue, runClock, setAllowRun, isEnabled, isIndependent = false, setShowWarning, setWarningOperation
}) {

    const [firstClockLauch, setFirstClockLaunch] = useState(false);
    const { isModalShown } = useContext(GlobalContext)

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

    // Setting clock
    useEffect(() => {
        setHoursCount(hourIncoming);
        setMinutesCount(minIncoming);
        setSecondsCount(secondsIncoming);
        // eslint-disable-next-line
    }, [minIncoming, hourIncoming, secondsIncoming]);

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

    // Modify hours for comparison
    useEffect(() => {
        setHoursAnalogue(hoursCount);
        // eslint-disable-next-line
    }, [hoursCount])


    // Modify minutes for comparison
    useEffect(() => {
        setMinsAnalogue(minutesCount);
        // eslint-disable-next-line
    }, [minutesCount])

    // Check if runnin separately to run from non-zero seconds
    useEffect(() => {
        setStartFromCurrentTime(isStartFromCurrentTime)
        // eslint-disable-next-line
    }, [isStartFromCurrentTime])


    // Check start possibility
    function timeSetting() {
        if (isIndependent) {
            setClock();
        }
        else {
            setAllowRun(true);
        }
    }

    return (
        <div className={classes.mainContainer}>
            <div className={classes.clockBody}>
                <div className={classes.innerRound}>
                    {/* Creating minutes marks */}
                    <div className={classes.dialsContainer}>
                        {
                            Array.from({ length: 60 }, ((v_, i) => (
                                <Dial key={`dialKey${i}`} digit={i + 1} />
                            )))
                        }
                        {/* Needles */}
                        <div className={classes.digitsContainer}>
                            <span style={{ transform: `rotateZ(${((hoursCount % 12 + minutesCount / 60 + secondsCount / 3600) * 30) + "deg"})` }} className={classes.hourNeedle}></span>
                            <span style={{ transform: `rotateZ(${(minutesCount + secondsCount / 60) * 6 + "deg"})` }} className={classes.minuteNeedle}></span>
                            <span style={{ transform: `rotateZ(${parseInt(secondsCount) * 6 + "deg"})` }} className={classes.secondNeedle}></span>
                            <div className={classes.dot}></div>
                            {/* Hours marks */}
                            {
                                Array.from({ length: 12 }, ((_, i) => (
                                    <span key={`dials${i}`}
                                        className={`${classes[`h${i + 1}`]} ${classes.timeDigit}`}
                                    >{i + 1}</span>
                                )))
                            }
                        </div>
                    </div>

                </div>
            </div>
            {/* Controllers */}
            <div className={classes.controlButtons}>
                <div className={classes.buttonHPlus}>
                    <LongPressButton buttonText={'H+'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={addHours} isClockRunning={clockRunning} isEnabledButton={isEnabled} />
                </div>
                <div className={classes.buttonHMinus}>
                    <LongPressButton buttonText={'H-'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={substractHours} isClockRunning={clockRunning} isEnabledButton={isEnabled} />
                </div>
            </div>
            <div className={classes.controlButtons}>
                <div className={classes.buttonMPlus}>
                    <LongPressButton buttonText={'M+'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={addMinutes} isClockRunning={clockRunning} isEnabledButton={isEnabled} />
                </div>
                <div className={classes.buttonMMinus}>
                    <LongPressButton buttonText={'M-'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={substractMinutes} isClockRunning={clockRunning} isEnabledButton={isEnabled} />
                </div>
                <div className={classes.buttonSet}>
                    <button style={isModalShown ? { pointerEvents: "none" } : null} onClick={isEnabled ? timeSetting : null}>
                        <span>SET</span>
                    </button>
                </div>
            </div>
        </div>
    )
}