import { useState } from 'react';
import { lngs } from "../../languages"
import { useTranslation } from "react-i18next";
import classes from './language-switcher.module.css'

export default function LanguageSwticherComponent() {

    const [displayOtherLanguages, setDisplayOtherLanguages] = useState(false);
    const { i18n } = useTranslation();

    function hoverCurrentLanguage() {
        setDisplayOtherLanguages(true);
    }

    function unHoverCurrentLanguage() {
        setDisplayOtherLanguages(false);
    }

    return (
        <div className={classes.languagesButtons}>
            <div onMouseEnter={hoverCurrentLanguage} onMouseLeave={unHoverCurrentLanguage}>
                {
                    Object.keys(lngs).map((lng) => (

                        <div className={classes.currentLanguage}>
                            {lng === i18n.resolvedLanguage ? <button key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng}>
                                <span className={classes.languageEmoji}>{lngs[lng].emoji}</span>
                                {displayOtherLanguages ? <span className={classes.nativeNameText}>{lngs[lng].nativeName}</span> : null}</button>
                                : null}
                        </div>
                    ))
                }
                {
                    Object.keys(lngs).map((lng) => (
                        displayOtherLanguages ? <div className={classes.othersLanguages}>
                            {lng !== i18n.resolvedLanguage ? <button key={lng} onClick={() => i18n.changeLanguage(lng)} disabled={i18n.resolvedLanguage === lng}>
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