import React from "react";
import '../css/modal.css';
import { useEffect, useRef } from "react"

function Modal({ handleClose, show, setShow, modalType, message }) {

    const ref = useRef()
    // https://www.codingdeft.com/posts/react-on-click-outside/
    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu,
            // then close the menu
            if (show && ref.current && !ref.current.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [show])

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section ref={ref} className={`modal-main ${(modalType === 'success') ? "success" : "error"}`}>
                <p>{message}</p>
                <button type="button" onClick={handleClose} >
                    Close
                </button>
            </section>
        </div>
    );
};

export default Modal;