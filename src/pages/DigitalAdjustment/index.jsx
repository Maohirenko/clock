import { useState, useEffect } from "react";
import AnalogueClock from "../../components/analogue-clock";
import DigitalClock from "../../components/digital-clock";
import classes from "../clock-page.module.css";
import generateRandomTime from '../../logic/genrateRandomTime';



export default function DigitalAdjustmentComponent() {

    const [hoursAnalogue, setHoursAnalogue] = useState(null);
    const [minsAnalogue, setMinsAnalogue] = useState(null);
    const [hoursDigital, setHoursDigital] = useState(6);
    const [minsDigital, setMinsDigital] = useState(12);
    const [runClock, setRunClock] = useState(false);
    const [isAnalogueEnabled, setIsAnalogueEnabled] = useState(false);
    const [isDigitalEnabled, setIsDigitalEnabled] = useState(true);


    useEffect(() => {
        const randomTime = generateRandomTime();
        setHoursAnalogue(randomTime.hours);
        setMinsAnalogue(randomTime.minutes);

    }, []);

    useEffect(() => {
        if (hoursAnalogue % 12 === hoursDigital % 12 && minsAnalogue === minsDigital) {
            console.log("works");
            setIsAnalogueEnabled(false);
            setIsDigitalEnabled(false);
            setRunClock(true);
        }
    }, [hoursDigital, minsDigital])


    function resetTask() {
        setRunClock(false);
        const randomTime = generateRandomTime();
        setHoursAnalogue(randomTime.hours);
        setMinsAnalogue(randomTime.minutes);
    }

    console.log("digit " + hoursDigital % 12 + "  " + minsDigital)
    console.log("analogue " + hoursAnalogue % 12  + "  " + minsAnalogue)

    return (
        <div className={classes.pageContainer}>
            {runClock ? null
                : <div>
                    <h2>Usage</h2>
                    <p>You have to syncronize <b>Digital</b> with analogue via adding or substracting hours and minutes untill time on digital clock won't be the same as on analogue</p>
                </div>}
            <div className={classes.clockPageContainer}>
                {
                    hoursAnalogue !== null && minsAnalogue !== null ?
                        <AnalogueClock hourIncoming={hoursAnalogue} minIncoming={minsAnalogue} setMinsAnalogue={setMinsAnalogue} setHoursAnalogue={setHoursAnalogue} runClock={runClock} isEnabled={isAnalogueEnabled} />
                        : null
                }
                {
                    hoursDigital !== null && minsDigital !== null ?
                        <DigitalClock hourIncoming={12} minIncoming={0} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} runClock={runClock} isEnabled={isDigitalEnabled} />
                        : null
                }
                            {
                runClock ? 
                    // <Link to={'/d-a'}>Next training</Link>
                    <button onClick={resetTask}>Next training</button>
                : null
            }

            </div>
        </div>
    )
}