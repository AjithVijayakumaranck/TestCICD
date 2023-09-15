import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Style from "./style.module.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import LoadingSpin from 'react-loading-spin'
import { useNavigate, useParams } from "react-router-dom";
import authInstance from "../../../instance/AuthInstance";


const ChangePassword = () => {

    const { userId } = useParams()

    const navigate = useNavigate();

    const [Loading, SetLoading] = useState(false)
    const [CurrentPassword, SetCurrentPassword] = useState('')
    const [NewPassword, SetNewPassword] = useState('')
    const [ConfirmNewPassword, SetConfirmNewPassword] = useState('')

    const [Error, SetError] = useState({
        CurrentPassword: "",
        NewPassword: "",
        ConfirmNewPassword: ""
    })

    //validation handlers

    const currentValidation = (CurrentPassword) => {
        if (CurrentPassword === "") {
            SetError({ ...Error, CurrentPassword: "This field cannot be empty" })
        } else {
            SetError({ ...Error, Currentpassword: "" })
        }
    }

    const passwordValidation = (NewPassword) => {
        if (NewPassword === "") {
            SetError({ ...Error, NewPassword: "This field cannot be empty" })
        } else {
            if (NewPassword.toString().length < 8) {
                SetError({ ...Error, NewPassword: "password must need atleast 8 characters" })
            } else {
                SetError({ ...Error, NewPassword: "" })
            }
        }
    }

    const confirmValidation = (ConfirmNewPassword) => {
        if (ConfirmNewPassword === "") {
            SetError({ ...Error, ConfirmNewPassword: "This field cannot be empty" })
        } else {
            if (ConfirmNewPassword !== NewPassword) {
                SetError({ ...Error, ConfirmNewPassword: "entered password is not similar" })
            } else {
                SetError({ ...Error, ConfirmNewPassword: "" })
            }
        }
    }


    const HandleUpdate = (e) => {
        e.preventDefault()

        SetLoading(true)
        authInstance.put("/api/user/profile/update_password", { currentPassword: CurrentPassword, newPassword: ConfirmNewPassword, userId: userId }).then((response) => {
            SetLoading(false)
            toast.success("Password updated")
            navigate('/profile')
        }).catch((error) => {
            console.log(error);
            SetLoading(false)
            toast.error(error.response.data.message)
        })

    }

    function ScrollToTopOnMount() {
        useEffect(() => {
            window.scrollTo(0, 0);
        }, []);
        return null;
    }

    return (
        <React.Fragment>
            <Navbar />
            <ScrollToTopOnMount />
            <div className={Style.Registration_wrapper}>
                <div className={Style.form_wrapper}>

                    <div className={Style.left_section}>
                        <div className={Style.reset_Details}>
                            <h1>Change Password</h1>
                            <p>Please provide your Current Password</p>
                        </div>
                        <form action="" onSubmit={(e) => { HandleUpdate(e) }}>
                            <div className={Style.input_div}>
                                <label htmlFor="currentpassword" >Current Password</label>
                                <input
                                    type="password"
                                    placeholder="current password"
                                    name="currentpassword"
                                    value={CurrentPassword}
                                    onChange={(e) => {
                                        SetCurrentPassword(e.target.value)
                                        currentValidation(e.target.value)
                                    }}
                                />
                                <p>{Error.CurrentPassword}</p>
                            </div>
                            <div className={Style.input_div}>
                                <label htmlFor="Newpassword" >New password</label>
                                <input
                                    type="password"
                                    placeholder="New password"
                                    name="NewPassword"
                                    id="Newpassword"
                                    value={NewPassword}
                                    onChange={(e) => {
                                        SetNewPassword(e.target.value)
                                        passwordValidation(e.target.value)
                                    }}
                                />
                                <p>{Error.NewPassword}</p>
                            </div>
                            <div className={Style.input_div}>
                                <label htmlFor="ConfirmNewpassword" >Confirm New password</label>
                                <input
                                    type="password"
                                    placeholder="Confirm new password"
                                    name="ConfirmNewPassword"
                                    id="ConfirmNewpassword"
                                    value={ConfirmNewPassword}
                                    onChange={(e) => {
                                        SetConfirmNewPassword(e.target.value)
                                        confirmValidation(e.target.value)
                                    }}
                                />
                                <p>{Error.ConfirmNewPassword}</p>
                            </div>

                            <button>{Loading ? (
                                <LoadingSpin size="20px" direction="alternate" width="4px" />
                            ) : (
                                "Continue"
                            )}</button>

                        </form>
                    </div>

                </div>
            </div>

            <Footer />
        </React.Fragment>
    )
}

export default ChangePassword