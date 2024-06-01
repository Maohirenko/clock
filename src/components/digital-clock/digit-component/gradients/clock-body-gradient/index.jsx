import classes from './gradient.module.css';

// Gradient for digital clock
export default function ClockBodyGradients() {
    return (
        <defs>
            <linearGradient id="clockStandLeftGradient">
                <stop className={classes.clockStndLeftGradStop1} offset="0%" />
                <stop className={classes.clockStndLeftGradStop2} offset="50%" />
                <stop className={classes.clockStndLeftGradStop3} offset="100%" />
            </linearGradient>
            <linearGradient id="clockStandRightGradient">
                <stop className={classes.clockStndRightGradStop1} offset="0%" />
                <stop className={classes.clockStndRightGradStop2} offset="50%" />
                <stop className={classes.clockStndRightGradStop3} offset="100%" />
            </linearGradient>
            <linearGradient id="clockFrontFaceLeftGradient">
                <stop className={classes.clockFrontLeftFaceGradStop1} offset="0%" />
                <stop className={classes.clockFrontLeftFaceGradStop2} offset="50%" />
                <stop className={classes.clockFrontLeftFaceGradStop3} offset="100%" />
            </linearGradient>
            <linearGradient id="clockFrontFaceCenterGradient">
                <stop className={classes.clockFrontCenterFaceGradStop1} offset="0%" />
                <stop className={classes.clockFrontCenterFaceGradStop2} offset="50%" />
                <stop className={classes.clockFrontCenterFaceGradStop3} offset="100%" />
            </linearGradient>
            <linearGradient id="clockFrontFaceRightGradient">
                <stop className={classes.clockFrontRightFaceGradStop1} offset="0%" />
                <stop className={classes.clockFrontRightFaceGradStop2} offset="50%" />
                <stop className={classes.clockFrontRightFaceGradStop3} offset="100%" />
            </linearGradient>
            <linearGradient id="clockBezelGradient">
                <stop className={classes.clockBezelGradStop1} offset="0%" />
                <stop className={classes.clockBezelGradStop2} offset="50%" />
                <stop className={classes.clockBezelGradStop3} offset="100%" />
            </linearGradient>
            <linearGradient id="clockBezelHorizontalGradient">
                <stop className={classes.clockBezelHorizontalGradStop1} offset="0%" />
                <stop className={classes.clockBezelHorizontalGradStop2} offset="50%" />
                <stop className={classes.clockBezelHorizontalGradStop3} offset="100%" />
            </linearGradient>
        </defs>
    )
}