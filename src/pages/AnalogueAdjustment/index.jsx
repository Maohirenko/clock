import PageTemplate from "../pageTemplate";

export default function AnalogueAdjustmentComponent() {
    return <PageTemplate anaglogueEnable={true} digitalEnable={false} />
}

// import { useState, useEffect } from "react";
// import AnalogueClock from "../../components/analogue-clock";
// import DigitalClock from "../../components/digital-clock";
// import classes from "../clock-page.module.css";
// import generateRandomTime from '../../logic/genrateRandomTime';


// export default function AnalogueAdjustmentComponent() {
    

//     const [hoursAnalogue, setHoursAnalogue] = useState(13);
//     const [minsAnalogue, setMinsAnalogue] = useState(6);
//     const [hoursDigital, setHoursDigital] = useState(null);
//     const [minsDigital, setMinsDigital] = useState(null);
//     const [runClock, setRunClock] = useState(false);
//     const [isAnalogueEnabled, setIsAnalogueEnabled] = useState(true);
//     const [isDigitalEnabled, setIsDigitalEnabled] = useState(true);


//     useEffect(() => {
//         setRandomTime();
//     }, []);

//     useEffect(() => {
//         if (hoursAnalogue % 12 === hoursDigital % 12 && minsAnalogue === minsDigital) {
//             console.log("works");
//             setIsAnalogueEnabled(false);
//             setIsDigitalEnabled(false);
//             setRunClock(true);
//         }
//     }, [hoursAnalogue, minsAnalogue])


//     function resetTask() {
//         setRunClock(false);
//         setRandomTime();
//         setIsAnalogueEnabled(true);
//         setIsDigitalEnabled(false);
//     }

//     const setRandomTime = () => {
//         const randomTime = generateRandomTime();
//         console.log(randomTime)
//         setHoursDigital(randomTime.hours);
//         setMinsDigital(randomTime.minutes);
//     }

//     return (
//         <div className={classes.pageContainer}>
//             {runClock ? null
//                 : <div>
//                     <h2>Usage</h2>
//                     <p>You have to syncronize <b>Analogue</b> with digital via adding or substracting hours and minutes untill time on analogue clock won't be the same as on digital</p>
//                 </div>}
//             <div className={classes.clockPageContainer}>
//                 {
//                     hoursAnalogue !== null && minsAnalogue !== null ?
//                         <AnalogueClock hourIncoming={6} minIncoming={13} setMinsAnalogue={setMinsAnalogue} setHoursAnalogue={setHoursAnalogue} runClock={runClock} isEnabled={isAnalogueEnabled} />
//                         : null
//                 }
//                 {
//                     hoursDigital !== null && minsDigital !== null ?
//                         <DigitalClock hourIncoming={hoursDigital} minIncoming={minsDigital} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} runClock={runClock} isEnabled={isDigitalEnabled} />
//                         : null
//                 }
//             {
//                 runClock ? 
//                     <button onClick={resetTask}>Next training</button>
//                 : null
//             }
//             </div>
//         </div>
//     )
// }