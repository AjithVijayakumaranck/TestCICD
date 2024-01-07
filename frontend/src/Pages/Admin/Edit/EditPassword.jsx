import React, { useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import adminInstance from '../../../instance/AdminInstance';

const EditPassword = ({ title, path }) => {

    const Navigate = useNavigate()
    const { Id } = useParams()

    const [Error, SetError] = useState({});
    const [Data, SetData] = useState({
        currentpassword: "",
        password: "",
        confirmpassword: ""
    })



    const validateForm = () => {
        let newErrors = {};
        if (Data.currentpassword === '') {
            newErrors.currentpassword = 'Current Password is required';
        }
        SetError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //validation handlers
    const passwordValidation = (e) => {
        if (e.target.value === "") {
            SetError({ ...Error, password: "This field cannot be empty" })
        } else {
            if (e.target.value.toString().length < 8) {
                SetError({ ...Error, password: "password must need atleast 8 characters" })
            } else {
                SetError({ ...Error, password: "" })
                SetData({ ...Data, password: e.target.value })
            }
        }
    }

    const confirmValidation = (e) => {
        if (e.target.value === "") {
            SetError({ ...Error, confirmpassword: "This field cannot be empty" })
        } else {
            if (e.target.value !== Data.password) {
                SetError({ ...Error, confirmpassword: "entered password is not similar" })
            } else {
                SetError({ ...Error, confirmpassword: "" })
                SetData({ ...Data, confirmpassword: e.target.value })
            }
        }
    }

    const HandleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            adminInstance.put('/api/super_admin/update_password', {
                profileId: Id, currentPassword: Data.currentpassword,
                newPassword: Data.confirmpassword
            }).then((response) => {
                toast.success("Sucessfully Created")
                Navigate(`/admin/${path}`)
            }).catch((err) => {
                console.log(err);
                toast.error("Something Went Wrong")
            })
        } else {
            console.log('Form validation failed');
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
                <div className={Style.bottomTable}>

                    <div className={Style.right}>
                        <form onSubmit={(e) => { HandleSubmit(e) }}>

                            <div className={Style.formInput}>
                                <label>Current Password <span>*</span> </label>
                                <input type="password"
                                    placeholder="password"
                                    id='password'
                                    value={Data.currentpassword}
                                    onChange={(e) => SetData({ ...Data, currentpassword: e.target.value })}
                                />
                                <p>{Error.currentPassword}</p>
                            </div>

                            <div className={Style.formInput}>
                                <label>Password <span>*</span> </label>
                                <input type="password"
                                    placeholder="password"
                                    id='password'
                                    onChange={(e) => passwordValidation(e)}
                                />
                                <p>{Error.password}</p>
                            </div>

                            <div className={Style.formInput}>
                                <label>Confirm Password <span>*</span> </label>
                                <input type="password"
                                    placeholder="confirm Password"
                                    id='confirmpassword'
                                    onChange={(e) => confirmValidation(e)}
                                />
                                <p>{Error.confirmpassword}</p>
                            </div>

                            <div className={Style.formBtn}>
                                <button>Save</button>
                                <button onClick={() => Navigate(`/admin/${path}`)}>Cancel</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPassword