import React, { useState } from "react";
import Modal from "./Modal";

function PostApi() {

    const [isPending, setIsPending] = useState(false)
    const [appVersion, setAppVersion] = useState('');
    const [show, setShow] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const newRecord = {
            app_version: "1.2.3",
        }

        let response = await fetch("https://dev.api.globetrott.app/api/check-app-version/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRecord)
        }).catch(err => {
            console.log(err.response.data);
        });
        console.log('New record added', newRecord);
        setIsPending(false);
        if (response.ok) {
            setIsPending(false);
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
                <label htmlFor="app_version">App version</label>
                <input type="text"
                    id="app_version"
                    value={appVersion}
                    onChange={(e) => setAppVersion(e.target.value)}
                    placeholder="App version..."
                    required />
                {!isPending && <button id="btn-post">Post api</button>}
                {isPending && <button id="btn-post" disabled>Posted...</button>}
            </form>
            <Modal show={show} handleClose={hideModal}>
                <p>Modal</p>
            </Modal>
        </section>
    );
}

export default PostApi;
