import classes from "./footer.module.css";

export default function Footer() {
    return (
        <div className={classes.footerContainer}>
            <span className={classes.copyright}>Copyright &#169;</span>
            <span className={classes.author}>Mykhailo Ohirenko 2024</span>
        </div>
    )
}