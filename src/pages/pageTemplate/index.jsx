import { useState, useEffect } from "react";
import AnalogueClock from "../../components/analogue-clock";
import DigitalClock from "../../components/digital-clock";
import classes from "../clock-page.module.css";
import generateRandomTime from '../../logic/genrateRandomTime';


export default function PageTemplate({ anaglogueEnable, digitalEnable }) {

    const [hoursAnalogue, setHoursAnalogue] = useState(0);
    const [minsAnalogue, setMinsAnalogue] = useState(0);
    const [hoursDigital, setHoursDigital] = useState(0);
    const [minsDigital, setMinsDigital] = useState(0);
    const [runClock, setRunClock] = useState(false);
    const [allowRun, setAllowRun] = useState(false);
    const [isAnalogueEnabled, setIsAnalogueEnabled] = useState(null);
    const [isDigitalEnabled, setIsDigitalEnabled] = useState(null);
    const [startHourAnalogue, setStartHourAnalogue] = useState(null);
    const [startMinuteAnalogue, setStartMinuteAnalogue] = useState(null);
    const [startHourDigital, setStartHourDigital] = useState(null);
    const [startMinuteDigital, setStartMinuteDigital] = useState(null);


    useEffect(() => {
        setRandomTime();
        setIsAnalogueEnabled(anaglogueEnable);
        setIsDigitalEnabled(digitalEnable);

    }, []);

    useEffect(() => {
        if (!runClock) {
            if (allowRun) {
                if (hoursAnalogue % 12 === hoursDigital % 12 && minsAnalogue === minsDigital) {
                    // console.log(hoursAnalogue, minsAnalogue, hoursDigital, minsDigital)
                    setRunClock(true);
                    setIsAnalogueEnabled(false);
                    setIsDigitalEnabled(false);
                }
            }
        }
        setAllowRun(false);

    }, [allowRun])


    function resetTask() {
        setRunClock(false);
        setAllowRun(false);
        setRandomTime();
        setIsAnalogueEnabled(anaglogueEnable);
        setIsDigitalEnabled(digitalEnable);
    }

    const setRandomTime = () => {
        const randomTime = generateRandomTime();
        let initalVal = 0;
        // console.log(randomTime);
        if (anaglogueEnable) {
            setStartHourDigital(randomTime.hours);
            setStartMinuteDigital(randomTime.minutes);
            setStartHourAnalogue(initalVal);
            setStartMinuteAnalogue(initalVal);
        }
        else {
            setStartHourAnalogue(randomTime.hours);
            setStartMinuteAnalogue(randomTime.minutes);
            setStartHourDigital(initalVal);
            setStartMinuteDigital(initalVal);
        }
    }

    return (
        <div className={classes.pageContainer}>
            {runClock ? null
                : <div>
                    <h2>Usage</h2>
                    <p>You have to syncronize <b>{anaglogueEnable ? 'Analogue' : 'Digital'}</b> with digital via adding or substracting hours and minutes untill time on {anaglogueEnable ? 'analogue' : 'digital'} clock won't be the same as on {anaglogueEnable ? 'digital' : 'analogue'}</p>
                </div>}
            <div className={classes.clockPageContainer}>
                {
                    hoursAnalogue !== null && minsAnalogue !== null && isAnalogueEnabled !== null ?
                        <AnalogueClock hourIncoming={startHourAnalogue} minIncoming={startMinuteAnalogue} setMinsAnalogue={setMinsAnalogue} setHoursAnalogue={setHoursAnalogue} runClock={runClock} setAllowRun={setAllowRun} isEnabled={isAnalogueEnabled} />
                        : null
                }
                {
                    hoursDigital !== null && minsDigital !== null && isDigitalEnabled !== null ?
                        <DigitalClock hourIncoming={startHourDigital} minIncoming={startMinuteDigital} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} runClock={runClock} setAllowRun={setAllowRun} isEnabled={isDigitalEnabled} />
                        : null
                }
            </div>
            {
                runClock ?
                    <button className={classes.resetButton} onClick={resetTask}>Next training</button>
                    : null
            }
        </div>
    )
}