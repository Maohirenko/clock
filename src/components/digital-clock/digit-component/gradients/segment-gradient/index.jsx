import classes from './gradient.module.css'

// Gradient for segment definition
export default function SegmentGradient() {
    return (
        <defs>
            <linearGradient id="Gradient1">
                <stop className={classes.stop1} offset="0%" />
                <stop className={classes.stop2} offset="50%" />
                <stop className={classes.stop3} offset="100%" />
            </linearGradient>
            <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="red" />
                <stop offset="50%" stopColor="black" stopOpacity="0" />
                <stop offset="100%" stopColor="blue" />
            </linearGradient>
        </defs>
    )
}