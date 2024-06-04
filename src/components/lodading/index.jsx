import classes from "./loading.module.css"

export default function Loading() {
    return (
        <div className={classes.loadingContainer}>
            <h1 className={classes.loadingText}>Keep waiting, the time is coming</h1>
        </div>
    )
}