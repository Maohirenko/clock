import SegmentGradient from '../gradients/segment-gradient'
import classes from './../digit.module.css'

export default function VerticalSegment({ active, isSeconds = false }) {
    return (
        <div>
            {
                isSeconds ?
                    // Vertical segment for seconds
                    <svg style={{ marginBottom: "-0.25em" }} height="20" width="4" xmlns="http://www.w3.org/2000/svg">
                        <SegmentGradient />
                        <polygon points="2,1 3,7 3,13 2,19 1,13 1,7"
                            className={active ? classes.activeSegment : classes.inActiveSegment}
                            style={{
                                strokeWidth: "1"
                            }} />
                    </svg>
                    :
                    // Vertical segment for minutes and hours
                    <svg style={{ marginTop: "-0.15em" }} height="32" width="8" xmlns="http://www.w3.org/2000/svg">
                        <SegmentGradient />
                        <polygon points="4,1 7,11 7,21 4,31 1,21 1,11"
                            className={active ? classes.activeSegment : classes.inActiveSegment}
                            style={{
                                strokeWidth: "3"
                            }} />
                    </svg>
            }
        </div>
    )
}
