import { useEffect, useState } from 'react';
import classes from './analogue-clock.module.css';
import Dial from './dial';
import useClock from '../../logic/useClock'
import LongPressButton from '../button-long-press';

export default function AnalogueClock() {

    const clockFunctions = useClock();
    const { secondsCount,
        minutesCount,
        hoursCount,
        clockRunning,
        addHours,
        substractHours,
        addMinutes,
        substractMinutes,
        setClock } = clockFunctions;

    // console.log(clockRunning)
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
                    <LongPressButton buttonText={'H+'} clockModifier={addHours} isClockRunning={clockRunning} />
                </div>
                <div className={classes.buttonHMinus}>
                    <LongPressButton buttonText={'H-'} clockModifier={substractHours} isClockRunning={clockRunning} />
                </div>
            </div>
            <div className={classes.controlButtons}>
                <div className={classes.buttonMPlus}>
                    <LongPressButton buttonText={'M+'} clockModifier={addMinutes} isClockRunning={clockRunning} />
                </div>
                <div className={classes.buttonMMinus}>
                    <LongPressButton buttonText={'M-'} clockModifier={substractMinutes} isClockRunning={clockRunning} />
                </div>
                <div className={classes.buttonSet}>
                    <button onClick={setClock}>SET</button>
                </div>
            </div>
        </div>
    )
}