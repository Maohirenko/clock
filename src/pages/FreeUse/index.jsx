import { useState, useEffect } from "react";
import AnalogueClock from "../../components/analogue-clock";
import DigitalClock from "../../components/digital-clock";
import classes from "../clock-page.module.css";
import ModalMessage from "../../components/modal";
import { useTranslation } from "react-i18next";
import SEO from "../../logic/SEO";


export default function FreeUseComponent() {

    const [hoursAnalogue, setHoursAnalogue] = useState(0);
    const [minsAnalogue, setMinsAnalogue] = useState(0);
    const [hoursDigital, setHoursDigital] = useState(0);
    const [minsDigital, setMinsDigital] = useState(0);
    const [runClock, setRunClock] = useState(false);
    // eslint-disable-next-line 
    const [allowRun, setAllowRun] = useState(false);
    // eslint-disable-next-line 
    const [isAnalogueEnabled, setIsAnalogueEnabled] = useState(true);
    // eslint-disable-next-line 
    const [isDigitalEnabled, setIsDigitalEnabled] = useState(true);
    const [startHourAnalogue, setStartHourAnalogue] = useState(null);
    const [startMinuteAnalogue, setStartMinuteAnalogue] = useState(null);
    const [startHourDigital, setStartHourDigital] = useState(null);
    const [startMinuteDigital, setStartMinuteDigital] = useState(null);
    const [startSeconds, setStartSeconds] = useState(0);
    const [showWarning, setShowWarning] = useState(false);
    const [warningOperation, setWarningOperation] = useState(null);

    const { t } = useTranslation();

    useEffect(() => {
        let currentTime = new Date();
        setStartHourAnalogue(currentTime.getHours());
        setStartMinuteAnalogue(currentTime.getMinutes());
        setStartHourDigital(currentTime.getHours());
        setStartMinuteDigital(currentTime.getMinutes());
        setStartSeconds(currentTime.getSeconds());
        setRunClock(true);
    }, []);

    function closeModal() {
        setShowWarning(false);
    }

    return (
        <div className={classes.pageContainer}>
            <SEO
                title={t('freeUseTitle')}
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
            <div className={classes.usageExplanation}>
                <h2>{t('usageTitle')}</h2>
                <p>{t('freeUsageDescription')}</p>
            </div>
            <div className={classes.clockPageContainer}>
                {
                    hoursAnalogue !== null && minsAnalogue !== null && isAnalogueEnabled !== null ?
                        <AnalogueClock hourIncoming={startHourAnalogue} minIncoming={startMinuteAnalogue} secondsIncoming={startSeconds} isStartFromCurrentTime={true} setMinsAnalogue={setMinsAnalogue} setHoursAnalogue={setHoursAnalogue} runClock={runClock} setAllowRun={setAllowRun} isEnabled={isAnalogueEnabled} isIndependent={true}
                            showWarning={showWarning} setShowWarning={setShowWarning} warningOperation={warningOperation} setWarningOperation={setWarningOperation}
                        />
                        : null
                }
                {
                    hoursDigital !== null && minsDigital !== null && isDigitalEnabled !== null ?
                        <DigitalClock hourIncoming={startHourDigital} minIncoming={startMinuteDigital} secondsIncoming={startSeconds} isStartFromCurrentTime={true} setMinsDigital={setMinsDigital} setHoursDigital={setHoursDigital} runClock={false} setAllowRun={setAllowRun} isEnabled={isDigitalEnabled} isIndependent={true}
                            showWarning={showWarning} setShowWarning={setShowWarning} warningOperation={warningOperation} setWarningOperation={setWarningOperation}
                        />
                        : null
                }
            </div>
        </div>
    )
}

