import React, { useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header';
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import instance from "../../../instance/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import adminInstance from '../../../instance/AdminInstance';



const NotificationForm = ({ title }) => {

    const Navigate = useNavigate();

    const [Error, SetError] = useState();
    const [Notification, SetNotification] = useState("")




    const HandleSubmit = (e) => {
        e.preventDefault()
        if (Notification !== "") {
            try {
                adminInstance.post('/api/super_admin/notification_control/sent_notification', { notification: Notification }).then((response) => {
                    toast.success('Sucessfully Sended')
                    Navigate('/admin/notifications')
                })
            } catch (error) {
                console.log(error);
                toast.error('Something Went Wrong')
            }
            SetError("")
        } else {
            SetError("Notification message is not available")
        }
    }

    return (
        <div className={Style.new}>
            <Sidebar />
            <div className={Style.newContainer}>
                <Header />

                <div className={Style.top}>
                    <h1>{title}</h1>
                </div>

                <div className={Style.center}>
                    <div className={Style.right}>

                        <form onSubmit={(e) => HandleSubmit(e)}>

                            <div className={Style.formInput}>
                                <label>Message <span>*</span> </label>
                                <input type="textbox"
                                    placeholder="name"
                                    id='planName'
                                    value={Notification}
                                    onChange={(e) => { SetNotification(e.target.value) }}
                                />
                                <p>{Error}</p>
                            </div>

                            <div className={Style.formBtn}>
                                <button>Send</button>
                                <button onClick={() => { Navigate('/admin/notifications') }}>Cancel</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div >
        </div >
    )
}

export default NotificationForm