import classes from './../digit.module.css'

export default function VerticalSegment({ active, isSeconds = false, lowerSegment = false }) {
    return (
        <div>
            {
                isSeconds ?
                    <svg style={{ backgroundColor: "", marginBottom: `${lowerSegment ? "4x" : "-5px"}` }} height="20" width="4" xmlns="http://www.w3.org/2000/svg">
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

                        <polygon points="2,1 3,7 3,13 2,19 1,13 1,7"
                            className={active ? classes.activeSegment : classes.inActiveSegment}
                            style={{
                                // fill: `${active ? "#535d46" : "transparent"}`,
                                //  stroke: `${active ? "#535d46" : "transparent"}`,
                                strokeWidth: "1"
                            }} />

                    </svg>
                    :
                    <svg style={{ backgroundColor: "", marginTop: "-3px" }} height="32" width="8" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="4,1 7,11 7,21 4,31 1,21 1,11"
                            className={active ? classes.activeSegment : classes.inActiveSegment}
                            style={{
                                // fill: `${active ? "#535d46" : "transparent"}`, stroke: `${active ? "#535d46" : "transparent"}`,
                                strokeWidth: "3"
                            }} />

                    </svg>
            }

        </div>
    )
}

{/* <polygon points="150,75 258,137 258,262 150,325 42,262 42,137"
                    style={{fill:"lime", stroke:"purple", strokeWidth:"3"}} /> */}