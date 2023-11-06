import React from 'react'
import Style from "./index.module.css"
import { useNavigate } from 'react-router-dom'


const Sidebar = () => {

    const Navigate = useNavigate();
   

    return (
        <div className={Style.content}>
            <div className={Style.contentWrapper}>
                <div className={Style.top}>
                    <div className={Style.title}>
                        <h3>Help Center</h3>
                    </div>
                </div>
                <div className={Style.bottom}>
                    <ul>
                        <li className={` ${window.location.pathname === '/help-center/register' ? Style.active : null}`} onClick={() => Navigate('/help-center/register')}>
                            <span>Registeration and Login</span>
                        </li>
                        <li className={` ${window.location.pathname === '/help-center/posting-ad' ? Style.active : null}`} onClick={() => Navigate('/help-center/posting-ad')}>
                            <span>Posting Ad</span>
                        </li>
                        <li className={` ${window.location.pathname === '/help-center/account-help-panel' ? Style.active : null}`} onClick={() => Navigate('/help-center/account-help-panel')}>
                            <span>Account Information</span>
                        </li>
                        <li className={` ${window.location.pathname === '/help-center/search-and-browse' ? Style.active : null}`} onClick={() => Navigate('/help-center/search-and-browse')}>
                            <span>Search and Browsing</span>
                        </li>
                        <li className={` ${window.location.pathname === '/help-center/reply-help-panel' ? Style.active : null}`} onClick={() => Navigate('/help-center/reply-help-panel')}>
                            <span>Reply to Ads</span>
                        </li>
                        <li className={` ${window.location.pathname === '/help-center/suggestion' ? Style.active : null}`} onClick={() => Navigate('/help-center/suggestion')}>
                            <span>Suggestion</span>
                        </li>
                        <li className={` ${window.location.pathname === '/help-center' ? Style.active : null}`} onClick={() => Navigate('/help-center')}>
                            <span>Contact Us</span>
                        </li>
                        <li className={` ${window.location.pathname === '/help-center/listing-policy' ? Style.active : null}`} onClick={() => Navigate('/help-center/listing-policy')}>
                            <span>Listing Policy</span>
                        </li>
                        <li className={` ${window.location.pathname === '/help-center/safety-tips' ? Style.active : null}`} onClick={() => Navigate('/help-center/safety-tips')}>
                            <span>Safety tips</span>
                        </li>
                        <li className={` ${window.location.pathname === '/help-center/fraud-help-panel' ? Style.active : null}`} onClick={() => Navigate('/help-center/fraud-help-panel')}>
                            <span>Fraud</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Sidebar