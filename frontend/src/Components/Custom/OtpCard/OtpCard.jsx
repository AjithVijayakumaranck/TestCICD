import React from 'react'
import Style from './index.module.css'
import LoadingSpin from "react-loading-spin";

const OtpCard = ({ otp, setOtp, otpDetails, setOtpDetails, loading, otpVerifyHandle, Error }) => {

    return (
        <div className={Style.OtpSection}>
            <h1>Lets Authenticate</h1>
            <p>We have sent you a One Time Password to your email/phone</p>
            <form onSubmit={otpVerifyHandle}>
                <label htmlFor="OTP">Enter Your Otp here</label>
                <div className={Style.input_div}>
                    <input
                        type="tel"
                        placeholder="One Time Password"
                        id="OTP"
                        value={otpDetails.otp}
                        onChange={(e) => setOtpDetails(e.target.value)}
                    />
                    <div className={Style.otpbtn_div}>
                        <button className={Style.otpbtn}>
                            {loading ? (
                                <LoadingSpin size="20px" direction="alternate" width="4px" />
                            ) : (
                                "Verify"
                            )}
                        </button>
                    </div>
                    <p className={Style.error_para}>{Error.otp}</p>
                </div>
            </form>
        </div>
    )
}

export default OtpCard