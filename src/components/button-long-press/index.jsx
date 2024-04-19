import { useEffect, useState, useRef } from "react";
import useClock from "../../logic/useClock";


export default function LongPressButton({ buttonText, clockModifier, isClockRunning, setShowWarning, setWarningOperation, isEnabledButton }) {

    // const buttonRef = useRef(null);
    const [longPress, setLongPress] = useState(false);
    // const longPressDetected = useRef();
    // longPressDetected.current = false;
    const clockFunctions = useClock();
    const { alertMessage } = clockFunctions;

    // let longPressInterval;

    function mouseDownHandle() {
        console.log("down")
        if (isClockRunning) {
            setShowWarning(true);
            setWarningOperation({ operation: buttonText[1], entity: buttonText[0] })
        }
        else {
            // longPressDetected.current = true;
            // console.log(longPressDetected.current )
            setLongPress(true);


            // longPressInterval = setInterval(() => {
            //             clockModifier();
            //         }, 200)
        }
    }

    function mouseUpHandle() {
        setLongPress(false)
        // longPressDetected.current = false;


        // clearInterval(longPressInterval);
        console.log("up")
    }

    useEffect(() => {
        console.log('use fire')
        let longPressInterval;
        if(isEnabledButton) {

        if (longPress) {
        // if (longPressDetected.current === true) {
            clockModifier();
            longPressInterval = setInterval(() => {
                clockModifier();
            }, 200)
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
        // if(longPress) {
        //     // clockModifier();
        // }
        }, [longPress, isEnabledButton])
    // }, [longPressDetected.current])
    // })

    useEffect(() => {

    }, [isEnabledButton])


    // console.log(longPressInterval)
    // console.log(longPressDetected.current)
    console.log(isEnabledButton)
    return (
        <div>
            {/* <p>{longPressDetected.current}</p> */}
        <button
            // ref={buttonRef}
            // onClick={clockModifier}
            onMouseDown={mouseDownHandle} onMouseUp={mouseUpHandle}
        >{buttonText}</button>
        </div>
    )
}