import { useState, useEffect } from "react";
import AnalogueClock from "../../components/analogue-clock";
import DigitalClock from "../../components/digital-clock";
import classes from "../clock-page.module.css";
import generateRandomTime from '../../logic/genrateRandomTime';
import { Link } from 'react-router-dom'



export default function CurrentTimeComponent() {


    const [hoursAnalogue, setHoursAnalogue] = useState(null);
    const [minsAnalogue, setMinsAnalogue] = useState(null);
    const [hoursDigital, setHoursDigital] = useState(null);
    const [minsDigital, setMinsDigital] = useState(null);
    const [runClock, setRunClock] = useState(false);


    useEffect(() => {
        // const randomTime = generateRandomTime();
        // setHoursDigital(randomTime.hours);
        // setMinsDigital(randomTime.minutes);


        let currentTime = new Date;
        console.log(currentTime.getMinutes())
        setHoursDigital(currentTime.getHours());
        setMinsDigital(currentTime.getMinutes());
        setHoursAnalogue(currentTime.getHours());
        setMinsAnalogue(currentTime.getMinutes());

        // setHoursDigital
    }, []);

    // useEffect(() => {
    //     if (hoursAnalogue % 12 === hoursDigital % 12 && minsAnalogue === minsDigital) {
    //         console.log("works");
    //         setRunClock(true);
    //     }
    // }, [hoursAnalogue, minsAnalogue])

    // console.log("digit " + hoursDigital % 12 + "  " + minsDigital)
    // console.log("analogue " + minsAnalogue + "  " + hoursAnalogue)

    // function resetTask() {
    //     setRunClock(false);
    //     const randomTime = generateRandomTime();
    //     setHoursDigital(randomTime.hours);
    //     setMinsDigital(randomTime.minutes);
    // }

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
                        <AnalogueClock hourIncoming={hoursAnalogue} minIncoming={minsAnalogue} setMinsAnalogue={setMinsAnalogue} setHoursAnalogue={setHoursAnalogue} runClock={true} isEnabled={true} />
                        : null
                }
                {
                    hoursDigital !== null && minsDigital !== null ?
                        <DigitalClock hourIncoming={hoursDigital} minIncoming={minsDigital} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} runClock={true} isEnabled={true} />
                        : null
                }
                {/* {
                runClock ? 
                    // <Link to={'/d-a'}>Next training</Link>
                    <button onClick={resetTask}>Next training</button>
                : null
            } */}
            </div>
        </div>
    )
}