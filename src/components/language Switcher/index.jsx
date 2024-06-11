import { useState, useContext } from 'react';
import { lngs } from "../../languages"
import { useTranslation } from "react-i18next";
import classes from './language-switcher.module.css'
import { GlobalContext } from '../context';

// Check of Windows os
const osType = new RegExp(/win/i);

export default function LanguageSwticherComponent() {

    const [displayOtherLanguages, setDisplayOtherLanguages] = useState(false);
    const { i18n } = useTranslation();
    const { isModalShown } = useContext(GlobalContext);

    // Get current device
    const currentDevice = navigator?.userAgentData?.platform || navigator?.platform;

    // Hinding/Showing other languages
    function hoverCurrentLanguage() {
        setDisplayOtherLanguages(true);
    }

    function unHoverCurrentLanguage() {
        setDisplayOtherLanguages(false);
    }

    function languageButtonPress(lng) {
        i18n.changeLanguage(lng);
        unHoverCurrentLanguage();
    }

    return (
        <div onMouseEnter={hoverCurrentLanguage} onMouseLeave={unHoverCurrentLanguage} className={`${classes.languagesButtons} ${displayOtherLanguages ? classes.languagesButtonsHover : null}`}>
            {
                // Displaying current language first
                Object.keys(lngs).map((lng) => (
                    <div key={lng} className={`${displayOtherLanguages ? classes.currentSelectionLanguage : ""}`}>
                        {lng === i18n.resolvedLanguage ? <button
                            className={`${isModalShown ? classes.disabledButton : ""}`}
                            onClick={() => i18n.changeLanguage(lng)}
                        >
                            {!displayOtherLanguages ?
                                <>
                                    {/* Windows doesn't have native support of coupling emojies to flags, so showing short name of language */}
                                    {osType.test(currentDevice) ?
                                        <span className={classes.winLangMark}>{lngs[lng].nativeNameShort}</span> :
                                        <span className={classes.languageEmoji}>{lngs[lng].emoji}</span>
                                    }
                                </>
                                :
                                <>
                                    {/* Windows doesn't have native support of coupling emojies to flags, so showing short name of language */}
                                    {osType.test(currentDevice) ?
                                        null :
                                        <span className={classes.languageEmoji}>{lngs[lng].emoji}</span>
                                    }
                                    <span className={classes.nativeNameText}>{lngs[lng].nativeName}</span>
                                </>
                            }
                        </button>
                            : null}
                    </div>
                ))
            }
            {/* Displaying others languages then */}
            {
                Object.keys(lngs).map((lng) => (
                    displayOtherLanguages ? <div key={lng} className={classes.otherLanguages}>
                        {lng !== i18n.resolvedLanguage ? <button
                            className={isModalShown ? classes.disabledButton : null}
                            onClick={() => languageButtonPress(lng)} disabled={i18n.resolvedLanguage === lng}>
                            {osType.test(currentDevice) ?
                                null :
                                <span className={classes.languageEmoji}>{lngs[lng].emoji}</span>
                            }
                            <span className={classes.nativeNameText}>{lngs[lng].nativeName}</span>
                        </button>
                            : null}
                    </div>
                        : null
                ))
            }
        </div>
    )
}