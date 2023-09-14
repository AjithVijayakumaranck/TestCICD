import React, { useContext } from 'react'
import Style from './Style.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import authInstance from '../../../instance/AuthInstance'
import { UserContext } from '../../../Contexts/UserContext'
import TimeAgo from 'react-timeago';

const NotificationCard = ({ HandleRead }) => {

    const LoggedInUser = useContext(UserContext);
    const { User, SetUser } = LoggedInUser

    const [Alert, SetAlert] = useState([])

    useEffect(() => {
        try {
            authInstance.get(`/api/user/notification/get_notification?userId=${User?._id}`).then((response) => {
                SetAlert(response.data)
            })
        } catch (error) {
            console.log(error);
        }
    })

    return (
        <div className={Style.alert_wrapper}>
            {Alert.map((alert, index) => {
                return (
                    <div className={Style.Item} key={index} onClick={() => HandleRead(alert?._id)}>
                        <div className={Style.left} >
                            <img src="/imgs/logo.jpg" alt="" />
                            <h4>{alert?.notification}</h4>
                        </div>
                        <div className={Style.right}>
                            <span className={Style.activeItem}> </span>
                            <span>  <TimeAgo date={alert?.createdAt} minPeriod={60} /> </span>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default NotificationCard
