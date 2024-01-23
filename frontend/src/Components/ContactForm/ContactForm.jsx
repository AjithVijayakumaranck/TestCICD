import React, { useState } from 'react'
import Style from "./index.module.css"
import { MdOutlineLocationOn, MdOutlineMail } from 'react-icons/md';
import { FiClock } from 'react-icons/fi';
import { BsTelephone } from 'react-icons/bs';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import instance from '../../instance/AxiosInstance';
import { toast } from 'react-toastify';

const ContactForm = () => {

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
                            <h2>Contact Information</h2>
                            <p>Feel free to get in touch with us. We're here to answer any questions or address any concerns you may have.
                                Your feedback and inquiries are important to us, and we look forward to hearing from you.</p>
                        </div>
                        <div className={Style.row}>
                            <div className={Style.col}>
                                <div className={Style.cont_info}>
                                    <h3>The Office</h3>
                                    <ul className={Style.cont_list}>
                                        <li>
                                            <i><MdOutlineLocationOn /></i>
                                            <span>Intuitive Soft Corporation, Mizone, Mangattuparamba, Kalliasseri, Kannur, 670567, Kerala, India.</span>
                                        </li>
                                        <li>
                                            <i><MdOutlineMail /></i>
                                            <span>contact.in@dealnbuy.co.in</span>
                                        </li>
                                        <li>
                                            <i><BsTelephone /></i>
                                            <span>+91 7907658092</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className={Style.col}>
                                <div className={Style.cont_info}>
                                    <h3>The Office</h3>
                                    <ul className={Style.cont_list}>
                                        <li >
                                            <i><FiClock /></i>
                                            <div>
                                                <span>Monday-Saturday</span>
                                                <span>10am-7pm</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={Style.right}>
                        <div className={Style.title}>
                            <h2>Got Any Questions?</h2>
                            <p>Use the form below to get in touch with the sales team</p>
                        </div>
                        <div className={Style.main_row}>
                            <form action="" onSubmit={(e) => handleSubmit(e)}>
                                <div className={Style.row}>
                                    <div className={Style.col}>
                                        <input
                                            type="text"
                                            placeholder="Name *"
                                            required
                                            name='name'
                                            value={Name}
                                            onChange={(e) => SetName(e.target.value)}
                                        />
                                    </div>
                                    <div className={Style.col}>
                                        <input type="email"
                                            placeholder='Email *'
                                            id="email"
                                            name="email"
                                            value={Email}
                                            onChange={(e) => SetEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className={Style.row}>
                                    <textarea
                                        cols="30"
                                        rows="4"
                                        required
                                        placeholder="Message *"
                                        value={Messages}
                                        onChange={(e) => SetMessages(e.target.value)}
                                    />
                                </div>
                                <div className={Style.row}>
                                    <button>Submit <i> <HiOutlineArrowNarrowRight /> </i></button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default ContactForm