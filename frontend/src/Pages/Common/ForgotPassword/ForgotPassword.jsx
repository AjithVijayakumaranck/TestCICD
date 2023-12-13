import React, { useState } from "react";
import Otp from "../../../Components/Otp/Otp";
import ResetPassword from "../../../Components/ResetPassword/ResetPassword";
import instance from "../../../instance/AxiosInstance";
import Style from "./Index.module.css";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingSpin from "react-loading-spin";

const ForgotPassword = () => {

  //loading State

  const [loading, setLoading] = useState(false)

  //error State

  const [error, setError] = useState({ message: "" })

  //component toggling states

  const [toggle, setToggle] = useState(true); //states toggles between Phonenumber and email

  const [auth, setAuth] = useState(false); //state toggles between otp component and forgotpasswaord component

  const [reset, setReset] = useState(false) //state toggles between resetPass and forgotpasswaord component

  //state for data saving

  const [data, setData] = useState("")

  const [formData, setFormdata] = useState({ email: "", phonenumber: "" })


  //api calls

  const submitHandler = (e) => {

    e.preventDefault()
    if (formData.email === "" && formData.phonenumber === "") {
      setError({ ...error, message: "This field cannot be empty" })
    } else {
      console.log(formData);
      setLoading(true)
      toggle ?
        instance.post("api/otpsent_email", formData).then((response) => {
          setData(response.data.userInfo.email)
          setLoading(false)
          setAuth(true)
        }).catch((error) => {
          setLoading(false)
          toast.error(error.response.data.message)
        }) :
        instance.post("api/otpsent_mobile", formData).then((response) => {
          setData(response.data.userInfo.phoneNumber)
          setLoading(false)
          setAuth(true)
        }).catch((error) => {
          setLoading(false)
          toast.error(error.response.data.message)
        })
    }
  }



  return (
    <div className={Style.container}>
      {reset ? <ResetPassword userData={data} /> : auth ? (
        <Otp userData={data} toggle={toggle} reset={setReset} />
      ) : (
        <div className={Style.form_container}>
          <div className={Style.left}>
            <h1>Lets find your Account</h1>
            <p>Enter your registered Email</p>
            <form onSubmit={submitHandler}>
              {toggle ? (
                <div>
                  {/* <label htmlFor="forgotEmail">Email</label> */}
                  <input type="Email" placeholder="Email" onChange={(e) => setFormdata({ ...formData, email: e.target.value })} id="forgotEmail" />
                  <p>{error.message}</p>
                </div>
              ) : (
                <div>
                  {/* <label htmlFor="forgotPhone">Phone Number</label> */}
                  <input type="tel" placeholder="Phonenumber" id="forgotPhone" value={formData.phonenumber} onChange={(e) => setFormdata({ ...formData, phonenumber: e.target.value })}/>
                  <p>{error.message}</p>
                </div>
              )}
              <button>{loading ? (
                <LoadingSpin size="20px" direction="alternate" width="4px" />
              ) : (
                "Continue"
              )}</button>
              {
                toggle ? <p>My Email not registed  <span onClick={() => setToggle(false)}> Use Phone Number instead </span></p> :
                  <p>My Phone Number not registed  <span onClick={() => setToggle(true)}> Use Email instead </span></p>
              }

            </form>
          </div>
          <div className={Style.right}>
          <img src="/Images/forgot.svg" alt="" />
          </div>
        </div>

      )}
    </div>
  );
};

export default ForgotPassword;
