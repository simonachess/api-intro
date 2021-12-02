import React, { useState } from "react";
import Modal from "./Modal";

// let latestRequestId = 0;

function GetApi() {

    const [response, setResponse] = useState({
        data: '',
        type: 'success'
    });
    const [isPending, setIsPending] = useState(false)
    const [show, setShow] = useState(false);

    // let requestId = latestRequestId + 1;
    // latestRequestId = requestId;

    const handleClick = async () => {
        setIsPending(true);

        // fetch('https://cors-anywhere.herokuapp.com/https://api.currentsapi.services/v1/latest-news')

        try {
            let response = await fetch("https://dev.api.globetrott.app/api/build-version/");

            let data = await response.json();
            // if (latestRequestId !== requestId) {
            //     console.log(
            //         `Lates request ID is ${latestRequestId} and request Id is ${requestId}`
            //     );
            //     return;
            // }
            setResponse({ data: data, type: 'success' });
            setIsPending(false);
            showModal();
        }
        catch (error) {
            console.log(error);
            setIsPending(false);
            setResponse({
                data: 'Ups... Something went wrong',
                type: 'error'
            });
            showModal();
        }
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
            <p>{response.data}</p>
            <Modal show={show}
                handleClose={hideModal}
                message={response.data}
                modalType={response.type}
                setShow={setShow} />
        </section>
    );
}

export default GetApi;
