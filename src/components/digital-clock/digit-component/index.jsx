import { useEffect, useState } from "react";
import VerticalSegment from './vertical-segment/index';
import HorizontalSegment from './horizontal-segment/index';
import classes from './digit.module.css'

const dimmedSegments = {
    s1: false,
    s2: false,
    s3: false,
    s4: false,
    s5: false,
    s6: false,
    s7: false,
};

const segmentsForDigit = {
    digit_0: {
        s1: true,
        s2: true,
        s3: true,
        s4: false,
        s5: true,
        s6: true,
        s7: true,
    },
    digit_1: {
        s1: false,
        s2: false,
        s3: false,
        s4: false,
        s5: false,
        s6: true,
        s7: true,
    },
    digit_2: {
        s1: false,
        s2: true,
        s3: true,
        s4: true,
        s5: true,
        s6: true,
        s7: false,
    },
    digit_3: {
        s1: false,
        s2: false,
        s3: true,
        s4: true,
        s5: true,
        s6: true,
        s7: true,
    },
    digit_4: {
        s1: true,
        s2: false,
        s3: false,
        s4: true,
        s5: false,
        s6: true,
        s7: true,
    },
    digit_5: {
        s1: true,
        s2: false,
        s3: true,
        s4: true,
        s5: true,
        s6: false,
        s7: true,
    },
    digit_6: {
        s1: true,
        s2: true,
        s3: true,
        s4: true,
        s5: true,
        s6: false,
        s7: true,
    },
    digit_7: {
        s1: false,
        s2: false,
        s3: true,
        s4: false,
        s5: false,
        s6: true,
        s7: true,
    },
    digit_8: {
        s1: true,
        s2: true,
        s3: true,
        s4: true,
        s5: true,
        s6: true,
        s7: true,
    },
    digit_9: {
        s1: true,
        s2: false,
        s3: true,
        s4: true,
        s5: true,
        s6: true,
        s7: true,
    }
};

export default function DigitComponent({ digit, isSeconds }) {
    const [activeSegments, setActiveSegments] = useState(dimmedSegments);

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
        <div className={isSeconds ? classes.digitsContainerSeconds : classes.digitsContainer}>
            <div className={isSeconds ? classes.leftSegmentsSeconds : classes.leftSegments}>
                <VerticalSegment active={activeSegments.s1} isSeconds={isSeconds} />
                <VerticalSegment active={activeSegments.s2} isSeconds={isSeconds} lowerSegment={true} />
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
                <VerticalSegment active={activeSegments.s7} isSeconds={isSeconds} lowerSegment={true} />
            </div>
        </div>
    )

}