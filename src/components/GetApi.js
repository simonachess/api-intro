import React, { useState } from "react";
import Modal from "./Modal";

let latestRequestId = 0;

function GetApi() {

    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false)
    const [show, setShow] = useState(false);

    let requestId = latestRequestId + 1;
    latestRequestId = requestId;

    const handleClick = () => {
        setIsPending(true);
        fetch('https://cors-anywhere.herokuapp.com/https://api.currentsapi.services/v1/latest-news')
            // fetch('https://dev.api.globetrott.app/api/build-version/')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.log('Something went wrong');
                }
            })
            .then(data => {
                console.log(data);
                if (latestRequestId !== requestId) {
                    console.log(
                        `Lates request ID is ${latestRequestId} and request Id is ${requestId}`
                    );
                }
                setData(data);
                setIsPending(false);
                showModal();
            })
            .catch(error => {
                console.log(error);

            });
    }


    const showModal = () => {
        setShow(true);
    };

    const hideModal = () => {
        setShow(false);
    };


    return (
        <section>
            {!isPending && <button id="btn-get" onClick={handleClick}>Get Api</button>}
            {isPending && <button id="btn-get" disabled>Getting...</button>}
            <p>{data}</p>
            <Modal show={show} handleClose={hideModal}>
                <p>Modal</p>
            </Modal>
        </section>

    );
}
export default GetApi;
