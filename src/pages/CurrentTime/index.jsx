// import PageTemplate from "../pageTemplate";

// export default function CurrentTimeComponent() {
//     return <PageTemplate anaglogueEnable={true} digitalEnable={true} />
// }


import { useState, useEffect } from "react";
import AnalogueClock from "../../components/analogue-clock";
import DigitalClock from "../../components/digital-clock";
import classes from "../clock-page.module.css";
import generateRandomTime from '../../logic/genrateRandomTime';


export default function CurrentTimeComponent({ anaglogueEnable, digitalEnable }) {

    const [hoursAnalogue, setHoursAnalogue] = useState(0);
    const [minsAnalogue, setMinsAnalogue] = useState(0);
    const [hoursDigital, setHoursDigital] = useState(0);
    const [minsDigital, setMinsDigital] = useState(0);
    const [runClock, setRunClock] = useState(false);
    const [allowRun, setAllowRun] = useState(false);
    const [isAnalogueEnabled, setIsAnalogueEnabled] = useState(true);
    const [isDigitalEnabled, setIsDigitalEnabled] = useState(true);
    const [startHourAnalogue, setStartHourAnalogue] = useState(null);
    const [startMinuteAnalogue, setStartMinuteAnalogue] = useState(null);
    const [startHourDigital, setStartHourDigital] = useState(null);
    const [startMinuteDigital, setStartMinuteDigital] = useState(null);


    useEffect(() => {
        let currentTime = new Date;
        setStartHourAnalogue(currentTime.getHours());
        setStartMinuteAnalogue(currentTime.getMinutes());
        setStartHourDigital(currentTime.getHours());
        setStartMinuteDigital(currentTime.getMinutes());
        setRunClock(true);
    }, []);


    return (
        <div className={classes.pageContainer}>
            {runClock ? null
                : <div>
                    <h2>Usage</h2>
                    <p>You have to syncronize <b>Analogue</b> with digital via adding or substracting hours and minutes untill time on analogue clock won't be the same as on digital</p>
                </div>}
            <div className={classes.clockPageContainer}>
                {
                    hoursAnalogue !== null && minsAnalogue !== null && isAnalogueEnabled !== null ?
                        <AnalogueClock hourIncoming={startHourAnalogue} minIncoming={startMinuteAnalogue} setMinsAnalogue={setMinsAnalogue} setHoursAnalogue={setHoursAnalogue} runClock={runClock} setAllowRun={setAllowRun} isEnabled={isAnalogueEnabled} isIndependent={true} />
                        : null
                }
                {
                    hoursDigital !== null && minsDigital !== null && isDigitalEnabled !== null ?
                        <DigitalClock hourIncoming={startHourDigital} minIncoming={startMinuteDigital} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} runClock={false} setAllowRun={setAllowRun} isEnabled={isDigitalEnabled} isIndependent={true} />
                        : null
                }
            </div>

        </div>
    )
}

