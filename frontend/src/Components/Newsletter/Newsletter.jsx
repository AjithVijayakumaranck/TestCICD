import React from 'react'
import Style from "./index.module.css"
import { useNavigate } from 'react-router-dom'

const Newsletter = () => {

    const Navigate = useNavigate()

    return (
        <div className={Style.newsletter}>
            <div className={Style.container}>
                <div className={Style.row}>
                    <div className={Style.left}>
                        <p>Have a question, suggestion, or just want to say hi? We'd love to hear from you! Our team at Deal and Buy is always eager to assist you.</p>
                    </div>
                    <div className={Style.right}>
                        <button onClick={() => { Navigate('/contact') }}>Contact Us</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Newsletter