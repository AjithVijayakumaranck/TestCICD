import React from 'react'
import Style from "./index.module.css"
import { useNavigate } from 'react-router-dom'


const SideMenu = () => {

    const Navigate = useNavigate();


    return (
        <div className={Style.content}>
            <div className={Style.contentWrapper}>
                <div className={Style.top}>
                    <div className={Style.title}>
                        <h3>Legal and Privacy</h3>
                    </div>
                </div>
                <div className={Style.bottom}>
                    <ul>
                        <li className={` ${window.location.pathname === '/legal-and-privacy' ? Style.active : null}`} onClick={() => Navigate('/legal-and-privacy')}>
                            <span>Privacy Notice</span>
                        </li>
                        <li className={` ${window.location.pathname === '/legal-and-privacy/terms&condition' ? Style.active : null}`} onClick={() => Navigate('/legal-and-privacy/terms&condition')}>
                            <span>Terms and Conditions</span>
                        </li>
                        <li className={` ${window.location.pathname === '/legal-and-privacy/cookies' ? Style.active : null}`} onClick={() => Navigate('/legal-and-privacy/cookies')}>
                            <span> Cookies and Similar Technologies</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default SideMenu