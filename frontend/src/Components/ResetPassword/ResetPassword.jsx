import React, { useState } from 'react'
import LoadingSpin from 'react-loading-spin'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import instance from '../../instance/AxiosInstance'
import Style from './index.module.css'

const ResetPassword = ({ userData }) => {


    //loading Status

    const [loading, setLoading] = useState(false)

    const [formData, setFormdata] = useState({
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState({
        password: "",
        confirmPassword: ""
    })

    const navigate = useNavigate()

    //validation handlers
    const passwordValidation = (e) => {
        if (e.target.value === "") {
            setError({ ...error, password: "This field cannot be empty" })
        } else {
            if (e.target.value.toString().length < 8) {
                setError({ ...error, password: "password must need atleast 8 characters" })
            } else {
                setError({ ...error, password: "" })
                setFormdata({ ...formData, password: e.target.value })
            }
        }
    }

    const confirmValidation = (e) => {
        if (e.target.value === "") {
            setError({ ...error, confirmPassword: "This field cannot be empty" })
        } else {
            if (e.target.value !== formData.password) {
                setError({ ...error, confirmPassword: "entered password is not similar" })
            } else {
                setError({ ...error, confirmPassword: "" })
                setFormdata({ ...formData, confirmPassword: e.target.value })
            }
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (formData.password === "" || formData.confirmPassword === "") {
            setError({ ...error, confirmPassword: "This field cannot be empty", password: "this field cannot be empty" })
        } else {
            setLoading(true)
            const data = { data: userData, password: formData.password }
            instance.post("api/resetpassword", { data: userData, password: formData.password }).then((response) => {
                setLoading(false)
                toast.success("Password updated")
                navigate('/registration_login')
            }).catch((error) => {
                setLoading(false)
                toast.error(error.response.data.message)
            })
        }
    }

    return (
        <div className={Style.containerwrap}>
            <div className={Style.form_container}>
                <div className={Style.left}>
                    <h1>Is that you</h1>
                    <p>We have sent an OTP to your email</p>
                    < form action="" onSubmit={(e) => {
                        submitHandler(e)
                    }}>
                        <div>
                            <label htmlFor="password">New Password</label>
                            <input type="Password" id='password' onChange={(e) => passwordValidation(e)} placeholder='New password' />
                            <p>{error.password}</p>
                        </div>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="Password" id='confirmPassword' placeholder='Confirm password' onChange={(e) => confirmValidation(e)} />
                            <p>{error.confirmPassword}</p>
                        </div>
                        <button>{loading ? (
                            <LoadingSpin size="20px" direction="alternate" width="4px" />
                        ) : (
                            "Continue"
                        )}</button>
                    </form>
                </div>
                <div className={Style.right}>
                    <img src="/Images/reset.svg" alt="" />
                </div>
            </div>
        </div>
    )

}

export default ResetPassword