import { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { GlobalContext } from "../context";


export default function LongPressButton({ buttonText, clockModifier, isClockRunning, setShowWarning, setWarningOperation, isEnabledButton }) {

    // Time of longpress detection
    const LONG_TOUCH_TIME = 200;
    const LONG_CLICK_TIME = 200;
    // Long press detection
    const [longClick, setLongClick] = useState(false);
    const [longTouch, setLongTouch] = useState(false);
    const { t } = useTranslation();
    const { isModalShown } = useContext(GlobalContext);

    const ref = useRef();

    // Listen evenets on the button
    useEffect(() => {
        const buttonRef = ref.current;
        buttonRef.addEventListener('mousedown', mouseDownHandle);
        buttonRef.addEventListener('mouseup', mouseUpHandle);
        buttonRef.addEventListener('touchstart', touchDownHandle);
        buttonRef.addEventListener('touchend', touchUpHandle);
        buttonRef.addEventListener('mouseleave', endfocus);
        return () => {
            buttonRef.removeEventListener('mousedown', mouseDownHandle);
            buttonRef.removeEventListener('mouseup', mouseUpHandle);
            buttonRef.removeEventListener('touchstart', touchDownHandle);
            buttonRef.removeEventListener('touchend', touchUpHandle);
            buttonRef.removeEventListener('mouseleave', endfocus);
        }
        // eslint-disable-next-line
    }, [isClockRunning]);

    // Remove focus from the button
    function endfocus() {
        setLongClick(false);
    }

    function mouseDownHandle(event) {
        event.preventDefault();
        // Show warning if user is trying to modyfy clock before stopping it
        if (isClockRunning) {
            setShowWarning(true);
            setWarningOperation(t('runningWarningMessage', { operation: buttonText[1] === '-' ? t('substract') : t('add'), entity: buttonText[0] === 'M' ? t('minutes') : t('hours') }));
        }
        else {
            setLongClick(true);
        }
    }

    function mouseUpHandle() {
        setLongClick(false)
    }

    // Treating mobile press
    function touchDownHandle(event) {
        event.preventDefault();
        if (isClockRunning) {
            setShowWarning(true);
            setWarningOperation(t('runningWarningMessage', { operation: buttonText[1] === '-' ? t('substract') : t('add'), entity: buttonText[0] === 'M' ? t('minutes') : t('hours') }));
        }
        else {
            setLongTouch(true);
        }
    }

    function touchUpHandle() {
        setLongTouch(false)
    }

    // Setting of long click
    useEffect(() => {
        let longClickInterval;
        if (isEnabledButton) {
            if (longClick) {
                clockModifier();
                longClickInterval = setInterval(() => {
                    clockModifier();
                }, LONG_CLICK_TIME)
            }
            else {
                clearInterval(longClickInterval);
                setLongClick(false);
            }
        }
        else {
            clearInterval(longClickInterval);
            setLongClick(false);
        }
        return () => {
            clearInterval(longClickInterval);
        }
        // eslint-disable-next-line
    }, [longClick, isEnabledButton])

    // In case of mobile device - setting on touch
    useEffect(() => {
        let longTouchInterval;
        if (isEnabledButton) {
            if (longTouch) {
                clockModifier();
                longTouchInterval = setInterval(() => {
                    clockModifier();
                }, LONG_TOUCH_TIME)
            }
            else {
                clearInterval(longTouchInterval);
                setLongTouch(false);
            }
        }
        else {
            clearInterval(longTouchInterval);
            setLongTouch(false);
        }
        return () => {
            clearInterval(longTouchInterval);
        }
        // eslint-disable-next-line
    }, [longTouch, isEnabledButton])

    return (
        <button style={isModalShown || !isEnabledButton ? { pointerEvents: "none" } : null} ref={ref}>{buttonText}</button>
    )
}
