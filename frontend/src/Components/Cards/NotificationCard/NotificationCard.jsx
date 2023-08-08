import React from 'react'
import Style from './Style.module.css'
import { useState } from 'react'
import { useEffect } from 'react'
import authInstance from '../../../instance/AuthInstance'

const NotificationCard = () => {

    const [Alert, SetAlert] = useState([])

    useEffect(() => {
        try {
            authInstance.get('/api/user/notification/get_notification').then((response) => {
                console.log(response.data);
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
                    <div key={index}>
                        <img src="/imgs/dnblogo.png" alt="" />
                        <h4>{alert.notification}</h4>
                    </div>
                )
            })}
        </div>
    )
}

export default NotificationCard
