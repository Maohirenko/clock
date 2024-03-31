import { Link } from "react-router-dom";
import classes from './header.module.css';



export default function Header() {
    return (
        <div className={classes.headerContainer}>
        {/* <div className={classes.headerContainer} > */}
            <h1>Header</h1>
            <div className={classes.navLinks}>
            <Link className={classes.link} to={'/d-a'}>
                <p>Digital to analogue</p>
            </Link>
            <Link className={classes.link} to={'/a-d'}>
                <p>Analogue to digital</p>
            </Link>
            <Link className={classes.link} to={'time'}>
                <p>Current Time</p>
            </Link>
            </div>
        </div>
    )
}