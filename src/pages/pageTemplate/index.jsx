import { useState, useEffect } from "react";
import AnalogueClock from "../../components/analogue-clock";
import DigitalClock from "../../components/digital-clock";
import classes from "../clock-page.module.css";
import generateRandomTime from '../../logic/genrateRandomTime';
import ModalMessage from "../../components/modal";
import { Trans, useTranslation } from "react-i18next";
import SEO from "../../logic/SEO";


export default function PageTemplate({ anaglogueEnable, digitalEnable }) {

    const SUCCESS_MESSAGE_DISPLAY_TIME = 7000;

    const [hoursAnalogue, setHoursAnalogue] = useState(0);
    const [minsAnalogue, setMinsAnalogue] = useState(0);
    const [hoursDigital, setHoursDigital] = useState(0);
    const [minsDigital, setMinsDigital] = useState(0);
    const [runClock, setRunClock] = useState(false);
    const [allowRun, setAllowRun] = useState(false);
    const [isAnalogueEnabled, setIsAnalogueEnabled] = useState(null);
    const [isDigitalEnabled, setIsDigitalEnabled] = useState(null);
    const [startHourAnalogue, setStartHourAnalogue] = useState(null);
    const [startMinuteAnalogue, setStartMinuteAnalogue] = useState(null);
    const [startHourDigital, setStartHourDigital] = useState(null);
    const [startMinuteDigital, setStartMinuteDigital] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const [warningOperation, setWarningOperation] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const { t } = useTranslation();

    // Initial set of time and availability of clocks
    useEffect(() => {
        setRandomTime();
        setIsAnalogueEnabled(anaglogueEnable);
        setIsDigitalEnabled(digitalEnable);
        // eslint-disable-next-line
    }, []);

    // Compare time to start, if running - show a message about misuse
    useEffect(() => {
        if (!runClock) {
            if (allowRun) {
                if (hoursAnalogue % 12 === hoursDigital % 12 && minsAnalogue === minsDigital) {
                    setRunClock(true);
                    setIsAnalogueEnabled(false);
                    setIsDigitalEnabled(false);
                }
            }
        }
        setAllowRun(false);
        // eslint-disable-next-line
    }, [allowRun])

    // Notify about right answer
    useEffect(() => {
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
        }, SUCCESS_MESSAGE_DISPLAY_TIME)
    }, [runClock])

    function closeModal() {
        setShowWarning(false);
    }

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
            <SEO
                title={t('pageTitle', { toSync: anaglogueEnable ? t('analogueLabel') : t('digitalLabel') })}
                description={t('descriptionMeta')}
                type="website"
                name="Mykhailo Ohirenko"
                keywords={t('keyWordsMeta')}
            />
            {
                showWarning ?
                    <ModalMessage onClose={closeModal} messageText={warningOperation} />
                    : null
            }
            <div className={`${runClock ? classes.invisibleElement : classes.visibleElement} ${classes.usageExplanation}`}>
                <h2>{t('usageTitle')}</h2>
                <p>
                    <Trans>
                        {t('usageDescription', { toSync: anaglogueEnable ? t('analogueLabel') : t('digitalLabel'), setted: anaglogueEnable ? t('digitalLabel') : t('analogueLabel') })}
                    </Trans>
                </p>
            </div>
            <div className={classes.clockPageContainer}>
                {
                    hoursAnalogue !== null && minsAnalogue !== null && isAnalogueEnabled !== null ?
                        <AnalogueClock hourIncoming={startHourAnalogue} minIncoming={startMinuteAnalogue} setMinsAnalogue={setMinsAnalogue} setHoursAnalogue={setHoursAnalogue} runClock={runClock} setAllowRun={setAllowRun} isEnabled={isAnalogueEnabled}
                            showWarning={showWarning} setShowWarning={setShowWarning} warningOperation={warningOperation} setWarningOperation={setWarningOperation}
                        />
                        : null
                }
                {
                    hoursDigital !== null && minsDigital !== null && isDigitalEnabled !== null ?
                        <DigitalClock hourIncoming={startHourDigital} minIncoming={startMinuteDigital} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} runClock={runClock} setAllowRun={setAllowRun} isEnabled={isDigitalEnabled}
                            showWarning={showWarning} setShowWarning={setShowWarning} warningOperation={warningOperation} setWarningOperation={setWarningOperation}
                        />
                        : null
                }
            </div>
            {
                runClock ?
                    <div className={classes.rightAnswerContainer}>
                        {
                            showSuccessMessage ?
                                <p className={classes.rightAnswerMessage}>{t('successMessage')}</p> :
                                <button className={classes.resetButton} onClick={resetTask}>{t('nextTraining')}</button>
                        }
                    </div>
                    : null
            }
        </div>
    )
}