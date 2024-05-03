// import PageTemplate from "../pageTemplate";

// export default function CurrentTimeComponent() {
//     return <PageTemplate anaglogueEnable={true} digitalEnable={true} />
// }


import { useState, useEffect } from "react";
import AnalogueClock from "../../components/analogue-clock";
import DigitalClock from "../../components/digital-clock";
import classes from "../clock-page.module.css";
import generateRandomTime from '../../logic/genrateRandomTime';
import ModalMessage from "../../components/modal";


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
    const [showWarning, setShowWarning] = useState(false);
    const [warningOperation, setWarningOperation] = useState(null);


    useEffect(() => {
        let currentTime = new Date;
        setStartHourAnalogue(currentTime.getHours());
        setStartMinuteAnalogue(currentTime.getMinutes());
        setStartHourDigital(currentTime.getHours());
        setStartMinuteDigital(currentTime.getMinutes());
        setRunClock(true);
    }, []);

    function closeModal() {
        setShowWarning(false);
    }


    return (
        <div className={classes.pageContainer}>
                                    {
                showWarning ?
                    <ModalMessage onClose={closeModal} messageText={warningOperation} />
                    : null
            }
            {/* {runClock ? null */}
                {/* :  */}
                <div className={classes.usageExplanation}>
                    <h2>Usage</h2>
                    <p>You can adust both clocks as you wish</p>
                </div>
                {/* } */}
            <div className={classes.clockPageContainer}>
                {
                    hoursAnalogue !== null && minsAnalogue !== null && isAnalogueEnabled !== null ?
                        <AnalogueClock hourIncoming={startHourAnalogue} minIncoming={startMinuteAnalogue} setMinsAnalogue={setMinsAnalogue} setHoursAnalogue={setHoursAnalogue} runClock={runClock} setAllowRun={setAllowRun} isEnabled={isAnalogueEnabled} isIndependent={true}
                        showWarning={showWarning} setShowWarning={setShowWarning} warningOperation={warningOperation} setWarningOperation={setWarningOperation} 
                        />
                        : null
                }
                {
                    hoursDigital !== null && minsDigital !== null && isDigitalEnabled !== null ?
                        <DigitalClock hourIncoming={startHourDigital} minIncoming={startMinuteDigital} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} runClock={false} setAllowRun={setAllowRun} isEnabled={isDigitalEnabled} isIndependent={true} 
                        showWarning={showWarning} setShowWarning={setShowWarning} warningOperation={warningOperation} setWarningOperation={setWarningOperation} 
                        />
                        : null
                }
            </div>

        </div>
    )
}

