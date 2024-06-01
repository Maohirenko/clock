import { useEffect } from "react";

// Buttons to ignore on outside click
const timeAdjustmentButtons = ['H+', 'H-', 'M+', 'M-'];

// Handle modal closing by outside click
export default function useOutsideClick(ref, handler) {
    useEffect(() => {
        // If click not on the controls or not on modal
        function listener(event) {
            if (!ref.current || ref.current.contains(event.target) || timeAdjustmentButtons.indexOf(event.target.innerText) !== -1) {
                return;
            }
            handler(event);
        }

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        }

    }, [ref, handler])
}