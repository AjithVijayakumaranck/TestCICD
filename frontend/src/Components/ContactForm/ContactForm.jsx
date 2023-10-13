import React, { useState } from 'react'
import Style from "./index.module.css"
import { MdOutlineLocationOn, MdOutlineMail } from 'react-icons/md';
import { BsCalendar3, BsTelephone } from 'react-icons/bs';
import { FiClock } from 'react-icons/fi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import instance from '../../instance/AxiosInstance';
import { toast } from 'react-toastify';

const PrivacyForm = () => {

    const [Name, SetName] = useState('');
    const [Email, SetEmail] = useState('');
    const [Messages, SetMessages] = useState('');

    const formData = { Name, Email, Messages }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            instance.post("/api/user/feedback/post_feedback", formData).then((Response) => {
                SetName('')
                SetMessages('')
                SetEmail('')
                toast.success("Feedback registered successfully")
            }).catch((err) => {
                console.log(err.response.data.messsage);
                SetEmail('')
                toast.error(err.response.data.messsage)
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={Style.contact_wrapper}>
            <div className={Style.container}>
                <div className={Style.row}>
                    <div className={Style.left}>
                        <div className={Style.title}>
                            <h2>Legal & Privacy</h2>
                        </div>
                        <div className={Style.row}>

                        </div>
                    </div>
                    <div className={Style.right}>
                        <div className={Style.title}>
                            <h2>Got Any Questions?</h2>
                            <p>Use the form below to get in touch with the sales team</p>
                        </div>
                        <div className={Style.main_row}>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default PrivacyForm