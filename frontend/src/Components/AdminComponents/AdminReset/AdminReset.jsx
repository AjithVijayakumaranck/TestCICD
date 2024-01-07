import React, { useState } from 'react'
import Style from './Style.module.css'
import LoadingSpin from 'react-loading-spin'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import instance from '../../../instance/AxiosInstance'


const AdminReset = ({ adminData }) => {

    const [Loading, SetLoading] = useState(false)

    const [FormData, SetFormData] = useState({
        password: "",
        confirmPassword: ""
    })
    const [Error, SetError] = useState({
        password: "",
        confirmPassword: ""
    })

    const Navigate = useNavigate()

    //validation handlers
    const passwordValidation = (e) => {
        if (e.target.value === "") {
            SetError({ ...Error, password: "This field cannot be empty" })
        } else {
            if (e.target.value.toString().length < 8) {
                SetError({ ...Error, password: "password must need atleast 8 characters" })
            } else {
                SetError({ ...Error, password: "" })
                SetFormData({ ...FormData, password: e.target.value })
            }
        }
    }

    const confirmValidation = (e) => {
        if (e.target.value === "") {
            SetError({ ...Error, confirmPassword: "This field cannot be empty" })
        } else {
            if (e.target.value !== FormData.password) {
                SetError({ ...Error, confirmPassword: "entered password is not similar" })
            } else {
                SetError({ ...Error, confirmPassword: "" })
                SetFormData({ ...FormData, confirmPassword: e.target.value })
            }
        }
    }

    const SubmitHandler = (e) => {
        e.preventDefault()
        if (FormData.password === "" || FormData.confirmPassword === "") {
            SetError({ ...Error, confirmPassword: "This field cannot be empty", password: "This field cannot be empty" })
        } else {
            SetLoading(true)
            const data = { data: adminData, password: FormData.password }
            instance.post("/api/super_admin/reset_Password", { data: adminData, password: FormData.password }).then((response) => {
                SetLoading(false)
                toast.success("Password updated")
                Navigate('/admin')
            }).catch((error) => {
                SetLoading(false)
                toast.error(error.response.data.message)
            })
        }
    }

    return (
        <div className={Style.Wrap}>
            <div className={Style.Title}>
                <h3>Enter New Password</h3>
            </div>
            <div className={Style.formWrap}>
                <form action="" onSubmit={(e) => SubmitHandler(e)}>
                    <div className={Style.formInput}>
                        <input type="password"
                            placeholder='New password'
                            required
                            id="password"
                            onChange={(e) => passwordValidation(e)}
                        />
                        <p>{Error.password}</p>
                    </div>
                    <div className={Style.formInput}>
                        <input type="password"
                            placeholder='Confirm Password'
                            required
                            id="confirm password"
                            onChange={(e) => confirmValidation(e)}
                        />
                        <p>{Error.confirmPassword}</p>
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
    )
}

export default AdminReset