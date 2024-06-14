import classes from "./loading.module.css"

export default function Loading() {
    return (
        <div className={classes.loadingContainer}>
            <h1 className={classes.loadingText}>Keep waiting please, the app is loading...</h1>
            <h2 className={classes.loadingText}>Зачекайте будь ласка, програма завантажується...</h2>
        </div>
    )
}