import React, { useState } from 'react'
import LoadingSpin from 'react-loading-spin'
import { toast } from 'react-toastify'
import instance from '../../../instance/AxiosInstance'
import Style from './Style.module.css'

const AdminOtp = ({ adminData, reset }) => {

    const [Loading, SetLoading] = useState(false) //loading state
    const [Otp, SetOtp] = useState("") // data state
    const [Error, SetError] = useState("")  //error state

    // submittion Handling

    const SubmitHandler = (e) => {
        e.preventDefault()

        if (Otp === "") {
            SetError("Enter the otp")
        }
        else {
            SetLoading(true)
            instance.post("/api/super_admin/verify_Otp", { adminData, Otp }).then((response) => {
                SetLoading(false)
                reset(true)
            }).catch((error) => {
                SetLoading(false)
                toast.error(error.response.data.message)
            })
        }
    }

    const resentOtp = () => {
        try {
            instance.post("/api/super_admin/forgot_password", { email: adminData }).then((response) => {
                toast.success("OTP sented")
            }).catch((error) => {
                toast.error(error.response.data.message)
            })
        } catch (error) {
            console.log(error);
        }
    }


    return (

        <div className={Style.Wrap}>
            <div className={Style.Title}>
                <h3>Enter Otp</h3>
            </div>
            <div className={Style.formWrap}>
                <form action="" onSubmit={(e) => { SubmitHandler(e) }}>
                    <div className={Style.formInput}>
                        <input type="number"
                            placeholder='Otp'
                            required
                            id="Otp"
                            value={Otp}
                            onChange={(e) => { SetOtp(e.target.value) }}
                        />
                        <span>{Error}</span>
                    </div>

                    <div className={Style.formInput}>
                        <button>{Loading ? (
                            <LoadingSpin size="20px" direction="alternate" width="4px" />
                        ) : (
                            "Verify"
                        )}</button>
                    </div>
                    <div className={Style.formInput}>
                        <p onClick={resentOtp}>Resent Otp</p>
                    </div>

                </form>
            </div>
        </div>

    )
}

export default AdminOtp







