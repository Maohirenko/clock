import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './header.module.css';
import { useTranslation } from "react-i18next";
import { GlobalContext } from '../context/index';
import LanguageSwticherComponent from "../language Switcher";

// Navigation throughout the app
export default function Header() {
    const { isModalShown } = useContext(GlobalContext)
    const { t } = useTranslation();
    const location = useLocation();
    const { pathname } = location;
    return (
        <div className={classes.headerContainer}>
            <div className={classes.languageSwitch}>
                <div className={classes.languageSwitchContainer}>
                    <LanguageSwticherComponent />
                </div>
            </div>
            <div className={classes.appHeading}>
                <h1 className={classes.appHeadingText}>{t('headerTitle')}</h1>
            </div>
            <div className={classes.navLinks}>
                <Link className={`${pathname === '/clock/analogue' ? classes.activeLink : classes.link} ${isModalShown ? classes.disabledButton : null}`} to={'/clock/analogue'}>
                    <p>{t('adjustButtonText', { toSync: t('analogueLabel') })}</p>
                </Link>
                <Link className={`${pathname === '/clock/digital' ? classes.activeLink : classes.link} ${isModalShown ? classes.disabledButton : null}`} to={'/clock/digital'}>
                    <p>{t('adjustButtonText', { toSync: t('digitalLabel') })}</p>
                </Link>
                <Link className={`${pathname === '/clock/time' ? classes.activeLink : classes.link} ${isModalShown ? classes.disabledButton : null}`} to={'/clock/time'}>
                    <p>{t('freeUseButtonText')}</p>
                </Link>
            </div>
        </div>
    )
}