import { Link, useLocation } from "react-router-dom";
import classes from './header.module.css';



export default function Header() {
    const location = useLocation();
    const { pathname } = location;
    return (
        <div className={classes.headerContainer}>
        {/* <div className={classes.headerContainer} > */}
            <h1>Analogue clock learning</h1>
            <div className={classes.navLinks}>
            <Link className={pathname === '/analogue' ? classes.activeLink : classes.link} to={'/analogue'}>
                <p>Adjust Analogue</p>
            </Link>
            <Link className={pathname === '/digital' ? classes.activeLink : classes.link} to={'/digital'}>
                <p>Adjust Digital</p>
            </Link>
            <Link className={pathname === '/time' ? classes.activeLink : classes.link} to={'/time'}>
                <p>Free use</p>
            </Link>
            </div>
        </div>
    )
}