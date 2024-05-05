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