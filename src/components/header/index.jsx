import { Link } from "react-router-dom";



export default function Header() {
    return (
        <div>
            <h1>Header</h1>
            <Link to={'/d-a'}>
                <p>Digital to analogue</p>
            </Link>
            <Link to={'/a-d'}>
                <p>Digital to analogue</p>
            </Link>
            <Link to={'time'}>
                <p>Current Time</p>
            </Link>
        </div>
    )
}