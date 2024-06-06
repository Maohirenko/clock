import { useState, useContext } from 'react';
// import { lngs } from "../../languages"
import { useTranslation } from "react-i18next";
import classes from './language-switcher.module.css'
import { GlobalContext } from '../context';

// App languages
const lngs = {
    en: { nativeName: 'English', emoji: '\u{1F1EC}\u{1F1E7}'},
    uk: { nativeName: 'Українська', emoji: '\u{1F1FA}\u{1F1E6}' },
    // fr: { nativeName: 'Francais', emoji: '\u{1F1EB}\u{1F1F7}' },
    // de: { nativeName: 'Deutsch', emoji: '\u{1f1e9}\u{1f1ea}' }
}

export default function LanguageSwticherComponent() {

    const [displayOtherLanguages, setDisplayOtherLanguages] = useState(false);
    const { i18n } = useTranslation();
    const { isModalShown } = useContext(GlobalContext);

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
        <div className={`${classes.languagesButtons} ${displayOtherLanguages ? classes.languagesButtonsHover : null}`}>
            <div onMouseEnter={hoverCurrentLanguage} onMouseLeave={unHoverCurrentLanguage}>
                {
                    // Displaying current language first
                    Object.keys(lngs).map((lng) => (
                        <div key={lng} className={`${classes.currentLanguage}  ${displayOtherLanguages ? classes.currentSelectionLanguage : null}`}>
                            {lng === i18n.resolvedLanguage ? <button
                                className={`${isModalShown ? classes.disabledButton : null}`}
                                onClick={() => i18n.changeLanguage(lng)}
                            >
                                <span className={classes.languageEmoji}>{lngs[lng].emoji}</span>
                                {displayOtherLanguages ? <span className={classes.nativeNameText}>{lngs[lng].nativeName}</span> : null}</button>
                                : null}
                        </div>
                    ))
                }
                {
                    // Displaying others languages then
                    Object.keys(lngs).map((lng) => (
                        displayOtherLanguages ? <div key={lng} className={classes.otherLanguages}>
                            {lng !== i18n.resolvedLanguage ? <button
                                className={isModalShown ? classes.disabledButton : null}
                                onClick={() => languageButtonPress(lng)} disabled={i18n.resolvedLanguage === lng}>
                                <span className={classes.languageEmoji}>{lngs[lng].emoji}</span>
                                <span className={classes.nativeNameText}>{lngs[lng].nativeName}</span>
                            </button>
                                : null}
                        </div>
                            : null
                    ))
                }
            </div>
        </div>
    )
}