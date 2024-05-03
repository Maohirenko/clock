import { useEffect, useState } from 'react';
import classes from './analogue-clock.module.css';
import Dial from './dial';
import useClock from '../../logic/useClock'
import LongPressButton from '../button-long-press';
import ModalMessage from '../modal';

export default function AnalogueClock({ minIncoming = 0, hourIncoming = 0, setMinsAnalogue, setHoursAnalogue, runClock, setAllowRun, isEnabled, isIndependent =  false,
    showWarning, setShowWarning, warningOperation, setWarningOperation
}) {

    useEffect(() => {
        setHoursCount(hourIncoming);
        setMinutesCount(minIncoming);
    }, [minIncoming, hourIncoming]);

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
        if(!runClock && isEnabled) {
            setHoursCount(0);
            setMinutesCount(0);
        }
    }, [runClock]);


    const [firstClockLauch, setFirstClockLaunch] = useState(false);
    // const [showWarning, setShowWarning] = useState(false);
    // const [warningOperation, setWarningOperation] = useState(null);

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

    // console.log(clockRunning)
    function closeModal() {
        setShowWarning(false);
    }

    useEffect(() => {
        setHoursAnalogue(hoursCount);
    }, [hoursCount])


    useEffect(() => {
        setMinsAnalogue(minutesCount);
    }, [minutesCount])


    function timeSetting() {
        if(isIndependent) {
            setClock();
        }
        else {
            setAllowRun(true);
        }
        // console.log('timesetpressed')
    }

    // console.log(hoursCount, minutesCount)
    // console.log(isEnabled)

    return (
        <div className={classes.mainContainer}>


            <div className={classes.clockBody}>
                <div className={classes.outerRound}>

                    <div className={classes.dials}>
                        {
                            Array.from({ length: 60 }, ((v_, i) => (
                                <Dial key={`dialKey${i}`} digit={i + 1} />
                            )))
                        }
                        <div className={classes.digitsContainer}>
                            <span style={{ transform: `rotateZ(${((hoursCount % 12 + minutesCount / 60 + secondsCount / 3600) * 30) + "deg"})` }} className={classes.hourNeedle}></span>
                            <span style={{ transform: `rotateZ(${(minutesCount + secondsCount / 60) * 6 + "deg"})` }} className={classes.minuteNeedle}></span>
                            <span style={{ transform: `rotateZ(${parseInt(secondsCount) * 6 + "deg"})` }} className={classes.secondNeedle}></span>
                            {/* <span style={{ transform: `rotateZ(${((hoursCount % 12) * 30) + "deg"})` }} className={classes.hourNeedle}></span>
                            <span style={{ transform: `rotateZ(${(minutesCount) * 6 + "deg"})` }} className={classes.minuteNeedle}></span>
                            <span style={{ transform: `rotateZ(${parseInt(secondsCount) * 6 + "deg"})` }} className={classes.secondNeedle}></span> */}
                            <div className={classes.dot}></div>
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
                    <button onClick={isEnabled ?  timeSetting : null}>
                        <span>SET</span>
                    </button>
                </div>
            </div>
            {/* {
                showWarning ?
                    <ModalMessage onClose={closeModal} messageText={warningOperation} />
                    : null
            } */}
        </div>
    )
}