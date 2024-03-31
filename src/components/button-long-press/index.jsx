import { useEffect, useState } from "react";
import useClock from "../../logic/useClock";


export default function LongPressButton({ buttonText, clockModifier, isClockRunning }) {

    const [longPress, setLongPress] = useState(false);
    const clockFunctions = useClock();
    const { alertMessage } = clockFunctions;

    function mouseDownHandle() {
        console.log("down")
        if (isClockRunning) {
            alertMessage();
        }
        else {
            setLongPress(true);
        }
    }

    function mouseUpHandle() {
        setLongPress(false)
        console.log("up")
    }

    useEffect(() => {
        let longPressInterval;
        if (longPress) {
            clockModifier();
            longPressInterval = setInterval(() => {
                clockModifier();
            }, 200)
        }
        return () => {
            clearInterval(longPressInterval);
        }
    }, [longPress])

    return (
        <button onMouseDown={mouseDownHandle} onMouseUp={mouseUpHandle}
        // onClick={clockRunning ? alertMessage : substractHours}
        >{buttonText}</button>
    )
}