import React, { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../instance/AxiosInstance";
import Style from "./index.module.css";
import LoadingSpin from "react-loading-spin";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"



const Signup = ({ setLogin }) => {



  //authentication option
  const [otp, setOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [ShowPassword, SetShowPassword] = useState(false);
  const [ShowConfirmPassword, SetShowConfirmPassword] = useState(false);
  const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);

  const maxDate = new Date().toISOString().split("T")[0];

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    SetShowPassword(!ShowPassword);
  };

  // Function to toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    SetShowConfirmPassword(!ShowConfirmPassword);
  };

  const [otpDetails, setOtpDetails] = useState({
    email: "",
    phonenumber: "",
    otp: "",
  });

  //States

  const [formError, setFormError] = useState(false);

  const [error, setError] = useState({
    fullname: "",
    lastname: "",
    email: "",
    dateOfbirth: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
    otp: "",
  });

  const [userData, setUserData] = useState({
    fullname: "",
    lastname: "",
    email: "",
    dateOfbirth: "",
    password: "",
    confirmPassword: "",
    phonenumber: "",
    locality: "",
    district: "",
    state: "",
    region: "",
    username: "",
  });

  //validations

  const fullname_validation = (e) => {
    if (/^[a-zA-Z\s-]*$/.test(e.target.value)) {
      setFormError(false);
      setError({ ...error, fullname: "" });
      setUserData({ ...userData, fullname: e.target.value });
      return true;
    } else {
      setFormError(true);
      setError({ ...error, fullname: "Space and Numbers are invalid " });
      setTimeout(() => {
        setError({ ...error, fullname: "" });
      }, 5000);
      return false;
    }
  };

  const lastname_validation = (e) => {
    if (/^[a-zA-Z\s-]*$/.test(e.target.value)) {
      setFormError(false);
      setError({ ...error, lastname: "" });
      setUserData({ ...userData, lastname: e.target.value });
      return true;
    } else {
      setFormError(true);
      setError({ ...error, lastname: "Space and Numbers are invalid " });
      setTimeout(() => {
        setError({ ...error, lastname: "" });
      }, 5000);
      return false;
    }
  };

  const email_validation = (e) => {
    if (/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(e.target.value)) {
      setFormError(false);
      setUserData({ ...userData, email: e.target.value });
      setError({ ...error, email: "" });
      return true;
    } else {
      setFormError(true);
      setError({ ...error, email: "Invalid email" });
      setTimeout(() => {
        setError({ ...error, email: "" });
      }, 5000);
      return false;
    }
  };

  const phone_validation = (e) => {
    if (e.target.value !== "") {
      setFormError(false);
      if (e.target.value.toString().length < 10) {
        setFormError(true);
        setError({ ...error, phonenumber: "Phonenumber must have 10 digits" });
      } else {
        setFormError(false);
        setUserData({ ...userData, phonenumber: e.target.value });
        setError({ ...error, phonenumber: "" });
        return true;
      }
    } else {
      setFormError(true);
      setError({ ...error, phonenumber: "This field cannot be empty" });
      setTimeout(() => {
        setError({ ...error, phonenumber: "" });
      }, 5000);
      return false;
    }
  };

  const dob_validation = (e) => {
    if (e.target.value !== "") {
      setFormError(false);
      setUserData({ ...userData, dateOfbirth: e.target.value });
      setError({ ...error, dateOfbirth: "" });
      return true;
    } else {
      setFormError(true);
      setError({ ...error, dateOfbirth: "Field can't be empty" });
      setTimeout(() => {
        setError({ ...error, dateOfbirth: "" });
      }, 5000);
      return false;
    }
  };

  const password_validation = (e) => {
    if (e.target.value !== "") {
      setFormError(true);
      if (e.target.value.replace(/ /g, "").length <= 8) {
        setError({ ...error, password: "Minimum 8 character needed" });
        return false;
      } else {
        setFormError(false);
        setError({ ...error, password: "" });
        setUserData({ ...userData, password: e.target.value });
        return true;
      }
    } else {
      setFormError(true);
      setError({ ...error, password: "Field can't be empty" });
      setTimeout(() => {
        setError({ ...error, password: "" });
      }, 5000);
      return false;
    }
  };

  const confirmPassword_validation = (e) => {
    if (e.target.value !== "") {
      setFormError(true);
      if (e.target.value.replace(/ /g, "") !== userData.password) {
        setError({ ...error, confirmPassword: "Enter Correct password" });
        return false;
      } else {
        setFormError(false);
        setError({ ...error, confirmPassword: "" });
        setUserData({ ...userData, confirmPassword: e.target.value });
        return true;
      }
    } else {
      setFormError(true);
      setError({ ...error, confirmPassword: "Field can't be empty" });
      setTimeout(() => {
        setError({ ...error, confirmPassword: "" });
      }, 5000);
      return false;
    }
  };

  // submit handler and submit validation
  const submitHandler = (e) => {
    setResponseError("");
    e.preventDefault();
    if (formError) {
      console.log("enter proper details");
    } else {
      setLoading(true);
      instance.post("/api/register2n1", userData).then((response) => {
        setLoading(false);
        setOtp(true);
        if (response.data.mobileVerified === false) {
          setIsEmailOtpVerified(true)
        }
      }).catch((Error) => {
        setLoading(false);
        toast.error("already used these credentials")
        setResponseError(Error.response?.data?.message);
      });
    }
  };

  const otpVerifyHandle = (e) => {
    e.preventDefault();
    setError({ ...error, otp: "" });
    if (e.target.value === "") {
      setError({ ...error, otp: "enter the otp" });
    } else {
      setLoading(true);

      isEmailOtpVerified ?
        instance.post("api/verifyphone", otpDetails).then((response) => {
          setLoading(false);
          setLogin(false)
          setOtp(false)
          toast.success("User registration successful")
        }).catch((error) => {
          setLoading(false);
          setOtp(false)
        })
        : instance.post("api/verifyemail2n1", otpDetails).then((response) => {
          setLoading(false);
          setIsEmailOtpVerified(true)
          setOtpDetails({ otp: "" })
          setOtp(true)
          toast.success("Email has been successfully verified")
        }).catch((error) => {
          setLoading(false);
          setOtp(false)
        });
    }
  };

  const otpHandler = (e) => {
    setOtpDetails({
      ...otpDetails,
      email: userData.email,
      phonenumber: userData.phonenumber,
      otp: e.target.value,
    });
  };

  return (
    <div className={Style.form_container}>

      <div className={Style.right_section}>
        <div className={Style.img_wrapper}>
          <img src="/Images/undraw.svg" alt="" />
        </div>
      </div>

      {otp ? (
        <div className={Style.left_section}>
          <h1>Lets Authenticate</h1>
          <p> We have sent you a One Time Password to your {" "} {isEmailOtpVerified ? "Phonenumber" : "Email"} </p>
          <form onSubmit={(e) => { otpVerifyHandle(e); }}>
            <div className={Style.input_div}>
              <div>
                <label htmlFor="OTP">Enter Your Otp here</label>
                <input
                  type="tel"
                  placeholder="One Time Password"
                  id="OTP"
                  value={otpDetails.otp}
                  onChange={(e) => { otpHandler(e); }}
                />
              </div>
            </div>
            <button>
              {loading ? (<LoadingSpin size="20px" direction="alternate" width="4px" />) :
                isEmailOtpVerified ? ("Complete Registration") : ("Continue")
              }
            </button>
            <p className={Style.error_para}>{error.otp}</p>
          </form>
        </div>
      ) : (
        <div className={Style.left_section}>
          <div className={Style.login_Details}>
            <h1>Create Account</h1>
            <p>Please provide your details to register on DealNBuy</p>
          </div>
          <form onSubmit={(e) => { submitHandler(e); }} >
            <div className={Style.input_div}>
              <div>
                <label htmlFor="Full_name">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => { fullname_validation(e); }}
                  required
                  id="Full_name"
                />
                <p>{error.fullname}</p>
              </div>

              <div>
                <label htmlFor="Last Name">Sur Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  id="lastname"
                  required
                  onChange={(e) => { lastname_validation(e); }}
                />
                <p>{error.lastname}</p>
              </div>
            </div>
            <div className={Style.input_div}>
              <div>
                <label htmlFor="DateofBirth">Date of birth</label>
                <input
                  type="date"
                  required
                  placeholder="Date of birth"
                  id="DateofBirth"
                  max={maxDate}
                  onChange={(e) => { dob_validation(e); }}
                />
                <p>{error.dateOfbirth}</p>
              </div>

              <div>
                <label htmlFor="Phone Number"> Phone Number{" "} </label>
                <input
                  required
                  type="tel"
                  placeholder="Phone Number"
                  id="phonenumber"
                  maxLength="10"
                  inputmode="numeric"
                  pattern="[0-9]*"
                  onChange={(e) => { phone_validation(e); }}
                />
                <p>{error.phonenumber}</p>
              </div>
            </div>
            <div className={Style.input_div}>
              <div>
                <label htmlFor="Email"> E-mail{" "} </label>
                <input
                  required
                  type="email"
                  placeholder="E-mail"
                  id="Email"
                  onChange={(e) => { email_validation(e); }}
                />
                <p>{error.email}</p>
              </div>
            </div>
            <div className={Style.input_div}>
              <div>
                <label htmlFor="password">Password</label>
                <div className={Style.input_Wrap}>
                  <input
                    type={ShowPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    id="password"
                    onChange={(e) => { password_validation(e); }}
                  />
                  <span className={Style.eye_icon} onClick={togglePasswordVisibility}>
                    {ShowPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </span>
                </div>
                <p>{error.password}</p>
              </div>
              <div>
                <label htmlFor="Confrim_Password">Confirm Password</label>
                <div className={Style.input_Wrap}>
                  <input
                    type={ShowConfirmPassword ? "text" : "password"}
                    required
                    placeholder="Confirm Password"
                    id="Confirm_Password"
                    onChange={(e) => { confirmPassword_validation(e); }}
                  />
                  <span className={Style.eye_icon} onClick={toggleConfirmPasswordVisibility}>
                    {ShowConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </span>
                </div>
                <p>{error.confirmPassword}</p>
              </div>
            </div>
            <button> {loading ? (<LoadingSpin size="20px" direction="alternate" width="4px" />) : ("Continue")} </button>
            <p className={Style.error_para}>{responseError}</p>
          </form>
          <div className={Style.additional_options}>
            <p> Already Have Account?
              <Link className={Style.navigation} onClick={() => { setLogin(false); }} > Login </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
