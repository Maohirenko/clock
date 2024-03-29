import classes from '../analogue-clock.module.css'

export default function Dial({ digit = 0 }) {
    return (
        <span className={classes.dial} style={{ transform: `rotateZ(${parseInt(digit) * 6}deg)` }}></span>
    )
}