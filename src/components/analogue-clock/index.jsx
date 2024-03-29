import { useEffect, useState } from 'react';
import classes from './analogue-clock.module.css';
import Dial from './dial';
import useClock from '../../logic/useClock'

export default function AnalogueClock() {

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


    return (
        <div className={classes.mainContainer}>

            <div className={classes.controlButtons}>
                <div className={classes.buttonHPlus}>
                    <button style={{ textAlign: "start" }} onClick={clockRunning ? alertMessage : addHours}>H+</button>
                </div>
                <div className={classes.buttonHMinus}>
                    <button style={{ textAlign: "start" }} onClick={clockRunning ? alertMessage : substractHours}>H-</button>
                </div>
            </div>
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
                <div className={classes.buttonMPlus}>
                    <button style={{ textAlign: "end" }} onClick={clockRunning ? alertMessage : addMinutes}>M+</button>
                </div>
                <div className={classes.buttonMMinus}>
                    <button style={{ textAlign: "end" }} onClick={clockRunning ? alertMessage : substractMinutes}>M-</button>
                </div>
                <div className={classes.buttonSet}>
                    <button onClick={setClock}>SET</button>
                </div>
            </div>
        </div>
    )
}