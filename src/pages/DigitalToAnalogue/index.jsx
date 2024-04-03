import { useState, useEffect } from "react";
import AnalogueClock from "../../components/analogue-clock";
import DigitalClock from "../../components/digital-clock";
import classes from "../clock-page.module.css";
import generateRandomTime from '../../logic/genrateRandomTime';



export default function DigitalToAnalogueComponent() {

    const [hoursAnalogue, setHoursAnalogue] = useState(13);
    const [minsAnalogue, setMinsAnalogue] = useState(6);
    const [hoursDigital, setHoursDigital] = useState(null);
    const [minsDigital, setMinsDigital] = useState(null);

    useEffect(() => {
        const randomTime = generateRandomTime();
        setHoursDigital(randomTime.hours);
        setMinsDigital(randomTime.minutes);

    }, []);

    return (
        <div className={classes.clockPageContainer}>
            <AnalogueClock hourIncoming={6} minIncoming={13} setMinsAnalogue={setMinsAnalogue} setHoursAnalogue={setHoursAnalogue} />
            {
                hoursDigital !== null && minsDigital !== null ?
                    <DigitalClock hourIncoming={hoursDigital} minIncoming={minsDigital} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} />
                    : null
            }

        </div>
    )
}