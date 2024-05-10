import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from './header.module.css';
import { useTranslation } from "react-i18next";
// import { lngs } from "../../languages";
import { GlobalContext } from '../context/index';
import LanguageSwticherComponent from "../language Switcher";



export default function Header() {
    const { isModalShown } = useContext(GlobalContext)
    // console.log(selectedLanguage);
    const { t } = useTranslation();
    const location = useLocation();
    const { pathname } = location;
    return (
        <div className={classes.headerContainer}>
            {/* <div> */}
                <div className={classes.languageSwitch}>
                    <div className={classes.languageSwitchContainer}>
                        <LanguageSwticherComponent />
                    </div>
                </div>
                <div className={classes.appHeading}>
                <h1 className={classes.appHeadingText}>{t('headerTitle')}</h1>
                </div>
            {/* </div> */}
            <div className={classes.navLinks}>
                <Link className={`${pathname === '/analogue' ? classes.activeLink : classes.link} ${isModalShown ? classes.disabledButton : null}`} to={'/analogue'}>
                    <p>{t('adjustButtonText', { toSync: t('analogueLabel') })}</p>
                </Link>
                <Link className={`${pathname === '/digital' ? classes.activeLink : classes.link} ${isModalShown ? classes.disabledButton : null}`} to={'/digital'}>
                    <p>{t('adjustButtonText', { toSync: t('digitalLabel') })}</p>
                </Link>
                <Link className={`${pathname === '/time' ? classes.activeLink : classes.link} ${isModalShown ? classes.disabledButton : null}`} to={'/time'}>
                    <p>{t('freUseButtonText')}</p>
                </Link>
            </div>
        </div>
    )
}