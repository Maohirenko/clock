import { useEffect } from "react";

const timeAdjustmentButtons = ['H+', 'H-', 'M+', 'M-'];

export default function useOutsideClick(ref, handler) {
    useEffect(() => {
        function listener(event) {
            console.log(timeAdjustmentButtons.indexOf('H+'))
            console.log(event.target.innerText === timeAdjustmentButtons[0])
            console.log(ref.current)
            console.log(event.target.innerText)
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

    },[ref, handler])
}