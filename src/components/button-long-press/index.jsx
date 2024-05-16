// import { useEffect, useState, useContext, useRef } from "react";
// import { useTranslation } from "react-i18next";
// import { GlobalContext } from "../context";


// export default function LongPressButton({ buttonText, clockModifier, isClockRunning, setShowWarning, setWarningOperation, isEnabledButton }) {

//     const [longClick, setLongClick] = useState(false);
//     const [longTouch, setLongTouch] = useState(false);
//     const { t } = useTranslation();
//     const { isModalShown } = useContext(GlobalContext);

//     const ref = useRef();

//     useEffect(() => {
//         const buttonRef = ref.current;
//         buttonRef.addEventListener('mousedown', mouseDownHandle);
//         buttonRef.addEventListener('mouseup', mouseUpHandle);
//         buttonRef.addEventListener('touchstart', touchDownHandle);
//         buttonRef.addEventListener('touchend', touchUpHandle);
//         buttonRef.addEventListener('mouseleave', endfocus);
//         return () => {
//             buttonRef.removeEventListener('mousedown', mouseDownHandle);
//             buttonRef.removeEventListener('mouseup', mouseUpHandle);
//             buttonRef.removeEventListener('touchstart', touchDownHandle);
//             buttonRef.removeEventListener('touchend', touchUpHandle);
//             buttonRef.removeEventListener('mouseleave', endfocus);
//         }
//     }, []);

//     function endfocus() {
//         setLongClick(false);
//     }

//     function mouseDownHandle(event) {
//         event.preventDefault();
//         if (isClockRunning) {
//             setShowWarning(true);
//             setWarningOperation(t('runningWarningMessage', { operation: buttonText[1] == '-' ? t('substract') : t('add'), entity: buttonText[0] == 'M' ? t('minutes') : t('hours') }));
//         }
//         else {
//             setLongClick(true);
//         }
//     }

//     function mouseUpHandle() {
//         setLongClick(false)
//     }

//     function touchDownHandle(event) {
//         event.preventDefault();
//         if (isClockRunning) {
//             setShowWarning(true);
//             setWarningOperation(t('runningWarningMessage', { operation: buttonText[1] == '-' ? t('substract') : t('add'), entity: buttonText[0] == 'M' ? t('minutes') : t('hours') }));
//         }
//         else {
//             setLongTouch(true);
//         }
//     }

//     function touchUpHandle() {
//         setLongTouch(false)
//     }

//     useEffect(() => {
//         let longClickInterval;
//         if (isEnabledButton) {
//             if (longClick) {
//                 clockModifier();
//                 longClickInterval = setInterval(() => {
//                     clockModifier();
//                 }, 250)
//             }
//             else {
//                 clearInterval(longClickInterval);
//                 setLongClick(false);
//             }
//         }
//         else {
//             clearInterval(longClickInterval);
//             setLongClick(false);
//         }
//         return () => {
//             clearInterval(longClickInterval);
//         }
//     }, [longClick, isEnabledButton])


//     useEffect(() => {
//         let longTouchInterval;
//         if (isEnabledButton) {
//             if (longTouch) {
//                 clockModifier();
//                 longTouchInterval = setInterval(() => {
//                     clockModifier();
//                 }, 500)
//             }
//             else {
//                 clearInterval(longTouchInterval);
//                 setLongTouch(false);
//             }
//         }
//         else {
//             clearInterval(longTouchInterval);
//             setLongTouch(false);
//         }
//         return () => {
//             clearInterval(longTouchInterval);
//         }
//     }, [longTouch, isEnabledButton])

//     return (
//         <div>
//             <button style={isModalShown ? { pointerEvents: "none" } : null}
//             ref={ref}
//             // onClick={(e)=>console.log(e)}
//                 // onMouseDown={mouseDownHandle} onMouseUp={mouseUpHandle}
//                 //  onTouchStart={touchDownHandle} onTouchEnd={touchUpHandle}
//             >{buttonText}</button>
//         </div>
//     )
// }

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export default function LongPressButton({ buttonText, clockModifier, isClockRunning, setShowWarning, setWarningOperation, isEnabledButton }) {

    const [longPress, setLongPress] = useState(false);
    const { t } = useTranslation();

    function mouseDownHandle() {
        if (isClockRunning) {
            setShowWarning(true);
            // let operation = buttonText[1] == '-' ? 'substract' : 'add';
            // let entity = buttonText[0] == 'M' ? 'minutes' : 'hours';
            setWarningOperation(t('runningWarningMessage', {operation: buttonText[1] == '-' ? t('substract') : t('add') , entity: buttonText[0] == 'M' ? t('minutes') : t('hours')}))
            // setWarningOperation(`To ${operation} ${entity} you need to stop a clock by pressing 'SET' button!`);
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