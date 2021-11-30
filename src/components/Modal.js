import React from "react";
import '../css/modal.css';

function Modal({ handleClose, show }) {

    const message = "Your request was successful"

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <p>{message}</p>
                <button type="button" onClick={handleClose} >
                    Close
                </button>
            </section>

        </div>
    );
};

export default Modal;