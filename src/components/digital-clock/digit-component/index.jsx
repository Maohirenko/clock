import { useEffect, useState } from "react";
import VerticalSegment from './vertical-segment/index';
import HorizontalSegment from './horizontal-segment/index';
import classes from './digit.module.css'
import { dimmedSegments, segmentsForDigit } from "./segmentsActivity";

export default function DigitComponent({ digit, isSeconds }) {
    // Turn off segments by default
    const [activeSegments, setActiveSegments] = useState(dimmedSegments);

    // Turn segments by incoming number
    useEffect(() => {
        let digitInt = parseInt(digit);
        switch (digitInt) {
            case 0:
                setActiveSegments(segmentsForDigit.digit_0);
                break;
            case 1:
                setActiveSegments(segmentsForDigit.digit_1);
                break;
            case 2:
                setActiveSegments(segmentsForDigit.digit_2);
                break;
            case 3:
                setActiveSegments(segmentsForDigit.digit_3);
                break;
            case 4:
                setActiveSegments(segmentsForDigit.digit_4);
                break;
            case 5:
                setActiveSegments(segmentsForDigit.digit_5);
                break;
            case 6:
                setActiveSegments(segmentsForDigit.digit_6);
                break;
            case 7:
                setActiveSegments(segmentsForDigit.digit_7);
                break;
            case 8:
                setActiveSegments(segmentsForDigit.digit_8);
                break;
            case 9:
                setActiveSegments(segmentsForDigit.digit_9);
                break;
            default:
                setActiveSegments(dimmedSegments);
                break;
        }
        return () => {
            setActiveSegments(dimmedSegments);
        }
    }, [digit])


    return (
        // Place segments to be able to form a digit
        <div className={isSeconds ? classes.digitsContainerSeconds : classes.digitsContainer}>
            <div className={isSeconds ? classes.leftSegmentsSeconds : classes.leftSegments}>
                <VerticalSegment active={activeSegments.s1} isSeconds={isSeconds} />
                <VerticalSegment active={activeSegments.s2} isSeconds={isSeconds} />
            </div>
            <div className={isSeconds ? classes.centralSegmentsSeconds : classes.centralSegments}>
                <HorizontalSegment active={activeSegments.s3} isSeconds={isSeconds} />
                <div className={isSeconds ? classes.centralSegmentSeconds : classes.centralSegment}>
                    <HorizontalSegment active={activeSegments.s4} isSeconds={isSeconds} />
                </div>
                <HorizontalSegment active={activeSegments.s5} isSeconds={isSeconds} />
            </div>
            <div className={isSeconds ? classes.rightSegmentsSeconds : classes.rightSegments}>
                <VerticalSegment active={activeSegments.s6} isSeconds={isSeconds} />
                <VerticalSegment active={activeSegments.s7} isSeconds={isSeconds} />
            </div>
        </div>
    )

}