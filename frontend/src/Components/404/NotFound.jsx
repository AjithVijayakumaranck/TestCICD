import React from 'react'
import Style from "./index.module.css"
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className={Style.pageWrapper}>
            <div className={Style.container}>
                <div className={Style.Image_wrap}>
                    <img src="/Images/404_error.svg" alt="" />
                </div>
                <div className={Style.content}>
                    <h1>Sorry, Page Not Found</h1>
                    <button><Link to="/" className={Style.nav} > GO TO HOMEPAGE</Link></button>
                </div>
            </div>
        </div>
    )
}

export default NotFound