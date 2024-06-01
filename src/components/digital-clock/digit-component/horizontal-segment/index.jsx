import SegmentGradient from '../gradients/segment-gradient'
import classes from './../digit.module.css'

// Horizontal segment of digital clock
export default function HorizontalSegment({ active, isSeconds = false }) {
    return (
        <div>
            {
                isSeconds ?
                    // polygons for hours and minutes
                    <svg height="4" width="20" xmlns="http://www.w3.org/2000/svg">
                        <SegmentGradient />
                        <polygon points="1,2 7,3 13,3 19,2 13,1 7,1"
                            className={active ? classes.activeSegment : classes.inActiveSegment}
                            style={{
                                strokeWidth: "1"
                            }} />

                    </svg>
                    :
                    //  polygons for seconds
                    <svg height="8" width="32" xmlns="http://www.w3.org/2000/svg">
                        <SegmentGradient />
                        <polygon points="1,4 11,7 21,7 31,4 21,1 11,1"
                            className={active ? classes.activeSegment : classes.inActiveSegment}
                            style={{
                                strokeWidth: "3"
                            }} />
                    </svg>
            }
        </div>
    )
}