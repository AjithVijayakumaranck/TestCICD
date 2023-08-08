import React from 'react'
import Style from './Style.module.css'
import { useState } from 'react'
import instance from '../../../instance/AxiosInstance'
import { useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from "react-toastify";
import { AdminContext } from '../../../Contexts/AdminContext';


const AdminLogin = () => {

    const Navigate = useNavigate()
    const LoggedInAdmin = useContext(AdminContext);
    const { Admin, SetAdmin } = LoggedInAdmin

    const [AdminData, SetAdminData] = useState({
        userId: "",
        password: ""
    })
   
    const LoginHandler = (e) => {
        e.preventDefault();
        console.log(AdminData, "Admindata");
        try {
            instance.post('/api/super_admin/admin_login', AdminData).then((res) => {
                //console.log(res.data);
                localStorage.setItem("AdminLogged", true)
                localStorage.setItem("AdminToken", res.data.token)
                SetAdmin(res.data.superAdminDetails)
                Navigate("/admin/home")
            }).catch((err) => {
                console.log(err);
                toast.error("Credentials are invalid")
            })

        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className={Style.Container}>
            <div className={Style.left}>
                <div className={Style.heading}>
                    <h1>Welcome Back</h1>
                </div>
            </div>
            <div className={Style.right}>
                <div className={Style.loginWrap}>
                    <div className={Style.Title}>
                        <h3>Admin Login</h3>
                    </div>
                    <div className={Style.formWrap}>
                        <form action="" onSubmit={(e) => { LoginHandler(e) }}>
                            <div className={Style.formInput}>
                                <input type="text"
                                    placeholder='Email/Phonenumber'
                                    required
                                    id="email/phonenumber"
                                    value={AdminData.data}
                                    onChange={(e) => { SetAdminData({ ...AdminData, userId: e.target.value }) }}
                                />
                            </div>
                            <div className={Style.formInput}>
                                <input type="password"
                                    placeholder='Password'
                                    required
                                    id="password"
                                    value={AdminData.password}
                                    onChange={(e) => { SetAdminData({ ...AdminData, password: e.target.value }) }}
                                />
                            </div>
                            <div className={Style.formText}>
                                <p><Link className={Style.navigation} to='/adminforgotpassword'>Forgot Password?</Link></p>
                            </div>
                            <div className={Style.formInput}>
                                <button>Login</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin