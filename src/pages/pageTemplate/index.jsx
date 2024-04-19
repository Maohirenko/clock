import { useState, useEffect } from "react";
import AnalogueClock from "../../components/analogue-clock";
import DigitalClock from "../../components/digital-clock";
import classes from "../clock-page.module.css";
import generateRandomTime from '../../logic/genrateRandomTime';
import {Link} from 'react-router-dom'



export default function PageTemplateComponent() {
    

    const [hoursAnalogue, setHoursAnalogue] = useState(null);
    const [minsAnalogue, setMinsAnalogue] = useState(null);
    const [hoursDigital, setHoursDigital] = useState(null);
    const [minsDigital, setMinsDigital] = useState(null);
    const [runClock, setRunClock] = useState(false);


    useEffect(() => {
        const randomTime = generateRandomTime();
        setHoursDigital(randomTime.hours);
        setMinsDigital(randomTime.minutes);

    }, []);

    useEffect(() => {
        if (hoursAnalogue % 12 === hoursDigital % 12 && minsAnalogue === minsDigital) {
            console.log("works");
            setRunClock(true);
        }
    }, [hoursAnalogue, minsAnalogue])

    console.log("digit " + hoursDigital % 12 + "  " + minsDigital)
    console.log("analogue " + minsAnalogue + "  " + hoursAnalogue)

    function resetTask() {
        setRunClock(false);
        const randomTime = generateRandomTime();
        setHoursDigital(randomTime.hours);
        setMinsDigital(randomTime.minutes);
    }

    return (
        <div>
            {runClock ? null
                : <div>
                    <h2>Usage</h2>
                    <p>You have to syncronize <b>Analogue</b> with digital via adding or substracting hours and minutes untill time on analogue clock won't be the same as on digital</p>
                </div>}
            <div className={classes.clockPageContainer}>
                {
                    hoursAnalogue !== null && minsAnalogue !== null ?
                        <AnalogueClock hourIncoming={6} minIncoming={13} setMinsAnalogue={setMinsAnalogue} setHoursAnalogue={setHoursAnalogue} runClock={runClock} isEnabled={true} />
                        : null
                }
                {
                    hoursDigital !== null && minsDigital !== null ?
                        <DigitalClock hourIncoming={hoursDigital} minIncoming={minsDigital} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} runClock={runClock} isEnabled={false} />
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