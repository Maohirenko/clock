import {useState} from 'react';
import { FaRectangleXmark } from 'react-icons/fa6';
import classes from './modal.module.css';


export default function ModalWarning({ warningOperation, onClose }) {

    const [closeButtonHover,  setCloseButtonHover] = useState(false);

    function handleCloseButtonHover() {
        setCloseButtonHover(!closeButtonHover)        
    }

    return (
        <div className={classes.modalContainer}>
            <p>modal</p>
            <div className={classes.closeButtonContainer}></div>
            <div className={classes.closeButton} onClick={onClose}  
            // onMouseEnter={setCloseButtonHover(true)} onMouseLeave={setCloseButtonHover(false)} 
            onMouseEnter={handleCloseButtonHover} onMouseLeave={handleCloseButtonHover} 
            >
                <FaRectangleXmark size={30} color={closeButtonHover ? 'red' : 'black'}/>
            </div>
            {
                warningOperation !== null ?
                    <p>To {warningOperation.operation === '-' ? 'substract' : 'add'} {warningOperation.entity === 'M' ? 'minutes' : 'hours'} you need to stop a clock by pressing 'SET' button!</p>
                    : null
            }

        </div>
    )
}