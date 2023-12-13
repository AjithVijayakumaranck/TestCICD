import React from 'react'
import Style from "./Style.module.css";
import { useNavigate } from 'react-router-dom'

const PopupModel = ({ SetModel }) => {

    const navigate = useNavigate();

    return (
        <div className={Style.popup}>
            <div className={Style.content}>
                <div className={Style.Title}>
                    <h3>Your free ad limit has been reached. Please subscribe to continue.</h3>
                </div>

                <div className={Style.btnBox}>
                    <button onClick={() => navigate('/subscribe')}>Goto Subscription Page</button>
                    <button onClick={() => SetModel(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default PopupModel