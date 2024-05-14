import React from 'react'
import Style from './Style.module.css'
import TimeAgo from 'react-timeago';
import { IoMailOpenSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import Logo from '../../../Assets/Images/logo.webp'



const NotificationCard = ({ HandleRead, Alert, User }) => {
console.log("alert:",Alert)
console.log("user:",User)

    return (
        <div className={Style.alert_wrapper}>
            {Alert.map((alert, index) => {
                const isRead = alert?.read.includes(User?._id);

                return (
                    <div className={Style.Item} key={index} onClick={() => HandleRead(alert?._id)}>
                        <div className={Style.left} >
                            <img src={Logo} alt="" />
                            <h4>{alert?.notification}</h4>
                        </div>
                        <div className={Style.right}>
                            <span className={Style.activeItem}>{isRead ? <IoMailOpenSharp /> : <IoMdMail />}</span>
                            <span> <TimeAgo date={alert?.createdAt} minPeriod={60} /> </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default NotificationCard
