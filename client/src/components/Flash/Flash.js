import React, { useEffect, useState } from 'react';
import Bus from '../../utils/bus';

import './Flash.css';

const Flash = () => {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');

    useEffect(() => {
        Bus.addListener('flash', ({message, type}) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setTimeout(() => {
                setVisibility(false);
            }, 4000);
        });
                

    }, []);

    useEffect(() => {
        if(document.querySelector('.close') !== null) {
            document.
            querySelector('.close').
            addEventListener('click', () => setVisibility(false));
        }
    })

    return (

        // visibility && <div className={`alert alert-${type} flash-message js-flash-message`} role="status" id="flashMessage1" data-duration="5000">
        //     <p>{message}</p>
        //     </div>

        // visibility && <div class={`alert alert-${type} success`}>
        //     <div class="msg-success">
        //         <div class="letter"></div>
        //     </div>
        //     <div class="shadow"></div>
        //     <h1 class="title">Success</h1>
        //     <p class="message">Wohoo! Your message was delivered successfully.</p>
        //     <button class="btn btn-success">Continue</button>
	    // </div>

        visibility && <div className={`alert alert-${type}`}>
                <span className="close"><strong>X</strong></span>
                <p>{message}</p>
            </div>
    )
}


export default Flash;