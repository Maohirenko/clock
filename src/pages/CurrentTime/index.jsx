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

    useEffect(() => {
        if (!runClock) {
            if (allowRun) {
                setRunClock(true);
                setIsAnalogueEnabled(false);
                setIsDigitalEnabled(false);
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
        console.log(randomTime);
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
                        <DigitalClock hourIncoming={startHourDigital} minIncoming={startMinuteDigital} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} runClock={runClock} setAllowRun={setAllowRun} isEnabled={isDigitalEnabled} isIndependent={true} />
                        : null
                }
            </div>

        </div>
    )
}


// import { useState, useEffect } from "react";
// import AnalogueClock from "../../components/analogue-clock";
// import DigitalClock from "../../components/digital-clock";
// import classes from "../clock-page.module.css";
// import generateRandomTime from '../../logic/genrateRandomTime';
// import { Link } from 'react-router-dom'



// export default function CurrentTimeComponent() {


//     const [hoursAnalogue, setHoursAnalogue] = useState(null);
//     const [minsAnalogue, setMinsAnalogue] = useState(null);
//     const [hoursDigital, setHoursDigital] = useState(null);
//     const [minsDigital, setMinsDigital] = useState(null);
//     const [runClock, setRunClock] = useState(false);


//     useEffect(() => {
//         // const randomTime = generateRandomTime();
//         // setHoursDigital(randomTime.hours);
//         // setMinsDigital(randomTime.minutes);


//         let currentTime = new Date;
//         console.log(currentTime.getMinutes())
//         setHoursDigital(currentTime.getHours());
//         setMinsDigital(currentTime.getMinutes());
//         setHoursAnalogue(currentTime.getHours());
//         setMinsAnalogue(currentTime.getMinutes());

//         // setHoursDigital
//     }, []);

//     // useEffect(() => {
//     //     if (hoursAnalogue % 12 === hoursDigital % 12 && minsAnalogue === minsDigital) {
//     //         console.log("works");
//     //         setRunClock(true);
//     //     }
//     // }, [hoursAnalogue, minsAnalogue])

//     // console.log("digit " + hoursDigital % 12 + "  " + minsDigital)
//     // console.log("analogue " + minsAnalogue + "  " + hoursAnalogue)

//     // function resetTask() {
//     //     setRunClock(false);
//     //     const randomTime = generateRandomTime();
//     //     setHoursDigital(randomTime.hours);
//     //     setMinsDigital(randomTime.minutes);
//     // }

//     return (
//         <div>
//             {runClock ? null
//                 : <div>
//                     <h2>Usage</h2>
//                     <p>You have to syncronize <b>Analogue</b> with digital via adding or substracting hours and minutes untill time on analogue clock won't be the same as on digital</p>
//                 </div>}
//             <div className={classes.clockPageContainer}>
//                 {
//                     hoursAnalogue !== null && minsAnalogue !== null ?
//                         <AnalogueClock hourIncoming={hoursAnalogue} minIncoming={minsAnalogue} setMinsAnalogue={setMinsAnalogue} setHoursAnalogue={setHoursAnalogue} runClock={true} isEnabled={true} />
//                         : null
//                 }
//                 {
//                     hoursDigital !== null && minsDigital !== null ?
//                         <DigitalClock hourIncoming={hoursDigital} minIncoming={minsDigital} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} runClock={true} isEnabled={true} />
//                         : null
//                 }
//                 {/* {
//                 runClock ? 
//                     // <Link to={'/d-a'}>Next training</Link>
//                     <button onClick={resetTask}>Next training</button>
//                 : null
//             } */}
//             </div>
//         </div>
//     )
// }