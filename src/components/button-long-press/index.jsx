import { useEffect, useState, useContext, useRef } from "react";
import { useTranslation } from "react-i18next";
import { GlobalContext } from "../context";


export default function LongPressButton({ buttonText, clockModifier, isClockRunning, setShowWarning, setWarningOperation, isEnabledButton, componentCall }) {

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
        // buttonRef.addEventListener('mouseout', endfocus)
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

    // Treating mouse click
    function mouseDownHandle(event) {
        event.preventDefault();
        // Show warning if user is trying to modyfy clock before stopping it
        if (isEnabledButton) {
            if (isClockRunning) {
                setShowWarning(true);
                setWarningOperation(t('runningWarningMessage', { operation: buttonText[1] === '-' ? t('substract') : t('add'), entity: buttonText[0] === 'M' ? t('minutes') : t('hours') }));
            }
            else {
                setLongClick(true);
            }
        }
        // Showing wrong attempt of adjustment of wrong clock
        else {
            setShowWarning(true);
            setWarningOperation(t('wrongClock', { wrong: componentCall === "analogue" ? t('analogueLabel') : t('digitalLabel'), right: componentCall === "digital" ? t('analogueLabel') : t('digitalLabel') }));
        }
    }

    function mouseUpHandle() {
        setLongClick(false)
    }

    // Treating mobile press
    function touchDownHandle(event) {
        event.preventDefault();
        // Show warning if user is trying to modyfy clock before stopping it
        if (isEnabledButton) {
            if (isClockRunning) {
                setShowWarning(true);
                setWarningOperation(t('runningWarningMessage', { operation: buttonText[1] === '-' ? t('substract') : t('add'), entity: buttonText[0] === 'M' ? t('minutes') : t('hours') }));
            }
            else {
                setLongTouch(true);
            }
        }
        // Showing wrong attempt of adjustment of wrong clock
        else {
            setShowWarning(true);
            setWarningOperation(t('wrongClock', { wrong: componentCall === "digital" ? t('analogueLabel') : t('digitalLabel'), right: componentCall === "analogue" ? t('analogueLabel') : t('digitalLabel') }));
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
        <div ref={ref}>
            <button style={isModalShown ? { pointerEvents: "none" } : null}><span>{buttonText}</span></button>
        </div>
    )
}
