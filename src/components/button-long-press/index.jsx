import { useEffect, useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import { GlobalContext } from "../context";


export default function LongPressButton({ buttonText, clockModifier, isClockRunning, setShowWarning, setWarningOperation, isEnabledButton }) {

    const [longPress, setLongPress] = useState(false);
    const { t } = useTranslation();
    const { isModalShown } = useContext(GlobalContext);

    function mouseDownHandle() {
        if (isClockRunning) {
            setShowWarning(true);
            setWarningOperation(t('runningWarningMessage', { operation: buttonText[1] == '-' ? t('substract') : t('add'), entity: buttonText[0] == 'M' ? t('minutes') : t('hours') }));
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
        if (isEnabledButton) {
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
            <button style={isModalShown ? { pointerEvents: "none" } : null}
                onMouseDown={mouseDownHandle} onMouseUp={mouseUpHandle}
            >{buttonText}</button>
        </div>
    )
}