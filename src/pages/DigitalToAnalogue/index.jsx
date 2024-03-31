import AnalogueClock from "../../components/analogue-clock";
import DigitalClock from "../../components/digital-clock";
import classes from "../clock-page.module.css"



export default function DigitalToAnalogueComponent() {
    return (
        <div className={classes.clockPageContainer}>
            <AnalogueClock/>
            <DigitalClock/>
        </div>
    )
}