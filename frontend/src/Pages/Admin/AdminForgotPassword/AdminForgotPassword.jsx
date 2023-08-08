import React, { useState, useEffect } from 'react'
import Style from './Style.module.css'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpin from "react-loading-spin";
import instance from '../../../instance/AxiosInstance';
import AdminReset from '../../../Components/AdminComponents/AdminReset/AdminReset';
import AdminOtp from '../../../Components/AdminComponents/AdminOtp/AdminOtp';




const AdminForgotPassword = () => {

    const [Loading, SetLoading] = useState(false) //loading State
    const [FormData, SetFormData] = useState({ email: "" })
    const [Error, SetError] = useState({ message: "" })
    const [Reset, SetReset] = useState(false) //state toggles between resetPass and forgotpasswaord component
    const [Auth, SetAuth] = useState(false); //state toggles between otp component and forgotpasswaord component
    const [Admindata, SetAdminData] = useState("")

    const SubmitHandler = (e) => {

        e.preventDefault()
        if (FormData.email === "") {
            SetError({ ...Error, message: "This field cannot be empty" })
        }
        else {
            console.log(FormData.email, "admin email");
            SetLoading(true)
            instance.post("/api/super_admin/forgot_password", FormData).then((response) => {
                console.log(response.data);
                SetAdminData(response.data.adminInfo.email)
                SetLoading(false)
                SetAuth(true)
            }).catch((error) => {
                SetLoading(false)
                toast.error(error.response.data.message)
            })
        }
    }


    return (

        <div className={Style.Container}>

            <div className={Style.left}>
                <div className={Style.heading}>
                    <h1>Hi Admin</h1>
                </div>
            </div>
            <div className={Style.right}>

                {Reset ?
                    <AdminReset adminData={Admindata} /> : Auth ? (
                        <AdminOtp adminData={Admindata} reset={SetReset} />
                    ) : (
                        <div className={Style.Wrap}>
                            <div className={Style.Title}>
                                <h3>Lets enter your Admin Details</h3>
                            </div>
                            <div className={Style.formWrap}>
                                <div className={Style.SubTitle}>
                                    <p>Enter your registered email</p>
                                </div>
                                <form action="" onSubmit={(e) => SubmitHandler(e)}>
                                    <div className={Style.formInput}>
                                        <input type="text"
                                            placeholder='Email'
                                            required
                                            id="email"
                                            value={FormData.email}
                                            onChange={(e) => SetFormData({ ...FormData, email: e.target.value })}
                                        />
                                        <p>{Error.message}</p>
                                    </div>

                                    <div className={Style.formInput}>
                                        <button>{Loading ? (
                                            <LoadingSpin size="20px" direction="alternate" width="4px" />
                                        ) : (
                                            "Continue"
                                        )}</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    )

}

export default AdminForgotPassword