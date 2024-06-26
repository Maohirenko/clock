import { useState, useContext, useEffect, useRef } from 'react';
import { FaRectangleXmark } from 'react-icons/fa6';
import classes from './modal.module.css';
import { GlobalContext } from '../context';
import useOutsideClick from '../../logic/outsideClick';
import { Trans } from 'react-i18next';

// Display message about misuse
export default function ModalMessage({ messageText, onClose }) {

    const [closeButtonHover, setCloseButtonHover] = useState(false);
    const { setiSModalShown } = useContext(GlobalContext);
    const ref = useRef();
    useOutsideClick(ref, () => onClose());

    function handleCloseButtonHover() {
        setCloseButtonHover(!closeButtonHover)
    }

    // Displaying modal
    useEffect(() => {
        setiSModalShown(true);
        return () => {
            setiSModalShown(false);
        }
    }, [setiSModalShown]);

    return (
        <div className={classes.modalContainer} ref={ref}>
            <div className={classes.closeButtonContainer}></div>
            <div className={classes.closeButton} onClick={onClose}
                onMouseEnter={handleCloseButtonHover} onMouseLeave={handleCloseButtonHover}
            >
                <FaRectangleXmark size={30} color={closeButtonHover ? 'red' : 'black'} />
            </div>
            {/* Displaying misuse message */}
            {
                messageText !== null ?
                    <Trans>
                        <p>{messageText}</p>
                    </Trans>

                    : null
            }
        </div>
    )
}