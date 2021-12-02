import React, { useState } from "react";
import Modal from "./Modal";

function PostApi() {

    const [isPending, setIsPending] = useState(false);
    const [show, setShow] = useState(false);
    const [response, setResponse] = useState({
        data: '',
        type: 'success'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        let newRecord = {
            app_version: "1.2.3",
        }
        try {
            await fetch("https://dev.api.globetrott.app/api/check-app-version/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newRecord)
            })

            console.log('New record added', newRecord);
            setResponse({ data: 'success', type: 'success' });
            setIsPending(false);
            showModal();
        }
        catch (error) {
            console.log(error);
            setIsPending(false);
            setResponse({ 
                data: 'Ups... Something went wrong', 
                type: 'error' });
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
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="app_version">App version</label>
                <input type="text"
                    id="app_version"
                    placeholder="App version..."
                    required /> */}
                {!isPending && <button id="btn-post">Post api</button>}
                {isPending && <button id="btn-post" disabled>Posted...</button>}
            </form>
            <Modal show={show}
                message={response.data}
                modalType={response.type}
                handleClose={hideModal} />
        </section>
    );
}

export default PostApi;
