import { useState, useContext, useEffect } from 'react';
import { FaRectangleXmark } from 'react-icons/fa6';
import classes from './modal.module.css';
import { GlobalContext } from '../context';


export default function ModalMessage({ messageText, onClose }) {

    const [closeButtonHover, setCloseButtonHover] = useState(false);
    const { isModalShown, setiSModalShown } = useContext(GlobalContext)

    function handleCloseButtonHover() {
        setCloseButtonHover(!closeButtonHover)
    }

    useEffect(() => {
        setiSModalShown(true);
        return () => {
            setiSModalShown(false);
        }
    }, []);

    console.log(isModalShown)

    return (
        <div className={classes.modalContainer}>
            {/* <p>modal</p> */}
            <div className={classes.closeButtonContainer}></div>
            <div className={classes.closeButton} onClick={onClose}
                // onMouseEnter={setCloseButtonHover(true)} onMouseLeave={setCloseButtonHover(false)} 
                onMouseEnter={handleCloseButtonHover} onMouseLeave={handleCloseButtonHover}
            >
                <FaRectangleXmark size={30} color={closeButtonHover ? 'red' : 'black'} />
            </div>
            {
                messageText !== null ?
                    <p>{messageText}</p>
                    : null
            }

        </div>
    )
}