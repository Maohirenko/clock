import { useEffect, useState } from 'react';
import classes from './analogue-clock.module.css';
import Dial from './dial';
import useClock from '../../logic/useClock'
import LongPressButton from '../button-long-press';
import ModalWarning from '../modal';

export default function AnalogueClock({minIncoming = 0, hourIncoming = 0}) {

    useEffect(() => {
        setHoursCount(hourIncoming);
        setMinutesCount(minIncoming);
    }, []);

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

    // console.log(clockRunning)
    function closeModal() {
        setShowWarning(false);
    }
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
                    <LongPressButton buttonText={'H+'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation} clockModifier={addHours} isClockRunning={clockRunning} />
                </div>
                <div className={classes.buttonHMinus}>
                    <LongPressButton buttonText={'H-'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation}  clockModifier={substractHours} isClockRunning={clockRunning} />
                </div>
            </div>
            <div className={classes.controlButtons}>
                <div className={classes.buttonMPlus}>
                    <LongPressButton buttonText={'M+'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation}  clockModifier={addMinutes} isClockRunning={clockRunning} />
                </div>
                <div className={classes.buttonMMinus}>
                    <LongPressButton buttonText={'M-'} setShowWarning={setShowWarning} setWarningOperation={setWarningOperation}  clockModifier={substractMinutes} isClockRunning={clockRunning} />
                </div>
                <div className={classes.buttonSet}>
                    <button onClick={setClock}>SET</button>
                </div>
            </div>
            {
                showWarning ? 
                <ModalWarning onClose={closeModal} warningOperation={warningOperation}/>
                : null
            }
        </div>
    )
}