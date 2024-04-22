import { useEffect, useState } from "react";


export default function LongPressButton({ buttonText, clockModifier, isClockRunning, setShowWarning, setWarningOperation, isEnabledButton }) {

    const [longPress, setLongPress] = useState(false);

    function mouseDownHandle() {
        if (isClockRunning) {
            setShowWarning(true);
            setWarningOperation({ operation: buttonText[1], entity: buttonText[0] })
        }
        else {
            setLongPress(true);
        }
    }

    function mouseUpHandle() {
        setLongPress(false)
    }

    useEffect(() => {
        let longPressInterval;
        if(isEnabledButton) {
        if (longPress) {
            clockModifier();
            longPressInterval = setInterval(() => {
                clockModifier();
            }, 150)
        }
        else {
            clearInterval(longPressInterval);
            setLongPress(false);
        }
    }
    else {
        clearInterval(longPressInterval);
        setLongPress(false);
    }
        return () => {
            clearInterval(longPressInterval);
        }
        }, [longPress, isEnabledButton])

    return (
        <div>
        <button
            onMouseDown={mouseDownHandle} onMouseUp={mouseUpHandle}
        >{buttonText}</button>
        </div>
    )
}