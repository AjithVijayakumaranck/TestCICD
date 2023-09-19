import React, { useState } from 'react'
import LoadingSpin from 'react-loading-spin'
import { toast } from 'react-toastify'
import instance from '../../instance/AxiosInstance'
import Style from "./index.module.css"

const Otp = ({ userData, toggle, reset }) => {

  //loading state

  const [loading, setLoading] = useState(false)

  // data state

  const [otp, setotp] = useState("")


  //error state

  const [error, setError] = useState("")

  // submittion Handling

  const submitHandler = (e) => {
    e.preventDefault()
    if (otp === "") {
      setError("Enter the otp")
    } else {
      setLoading(true)
      toggle ?
        instance.post("api/verifyotp_email", { userData, otp }).then((response) => {
          setLoading(false)
          reset(true)
        }).catch((error) => {
          setLoading(false)
          toast.error(error.response.data.message)
        }) :
        instance.post("api/verifyotp_mobile", { userData, otp }).then((response) => {
          setLoading(false)
          reset(true)
        }).catch((error) => {
          setLoading(false)
          toast.error(error.response.data.message)
        })
    }
  }

  const resentOtp = () => {
    toggle ?
      instance.post("api/otpsent_email", { email: userData }).then((response) => {
        toast.success("OTP sented")
      }).catch((error) => {
        toast.error(error.response.data.message)
      }) :
      instance.post("api/otpsent_mobile", { phonenumber: userData }).then((response) => {
        toast.success("OTP sented")
      }).catch((error) => {
        toast.error(error.response.data.message)
      })
  }




  return (
    <div className={Style.form_container}>
      <div className={Style.left}>
        <h1>Is that you</h1>
        <p>We have sent an OTP to your email</p>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor="otpBox">One Time Password</label>
            <input type="text" onChange={(e) => { setotp(e.target.value) }} id='otpBox' placeholder='One Time Password' />
            <p>{error}</p>
          </div>
          <button>{loading ? (
            <LoadingSpin size="20px" direction="alternate" width="4px" />
          ) : (
            "Verify"
          )}</button>
          <p onClick={resentOtp}>Resent Otp</p>
        </form>
      </div>
      <div className={Style.right}>
        <img src="/Images/otp.svg" alt="" />
      </div>
    </div>
  )
}

export default Otp