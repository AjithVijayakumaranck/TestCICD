import React, { useEffect, useState } from "react";
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

  const [Step, SetStep] = useState(0);
  const [Timer, SetTimer] = useState(60);
  const [IsTimerRunning, SetIsTimerRunning] = useState(false);

  const [registrationDate] = useState(new Date()); // Assuming this is fetched or set somewhere
  const [minDOB] = useState(() => {
    const minDOBDate = new Date(registrationDate);
    minDOBDate.setFullYear(minDOBDate.getFullYear() - 90);
    return minDOBDate;
  });
  const [maxDOB] = useState(() => {
    const maxDOBDate = new Date(registrationDate);
    maxDOBDate.setFullYear(maxDOBDate.getFullYear() - 18);
    return maxDOBDate;
  });

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

  // -- To set Otp into the state
  const otpHandler = (e) => {
    setOtpDetails({
      ...otpDetails,
      email: userData.email,
      phonenumber: userData.phonenumber,
      otp: e.target.value,
    });
  };

  // -- Function to set timer to resend the Otp
  useEffect(() => {
    let interval;

    if (IsTimerRunning && Timer > 0) {
      interval = setInterval(() => {
        SetTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (Timer === 0) {
      SetIsTimerRunning(false);
      SetTimer(60); // Reset timer
    }

    return () => {
      clearInterval(interval);
    };
  }, [IsTimerRunning, Timer]);

  // -- From validations
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

  // -- Submit handler and submit validation
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
        SetStep(Step + 1);
        if (response.data.mobileVerified === false) {
          setIsEmailOtpVerified(true);
        }
      }).catch((Error) => {
        setLoading(false);
        toast.error("already used these credentials")
        setResponseError(Error.response?.data?.message);
      });
    }
  };

  // -- Function to handle Otp verification
  const HandleOtpVerify = (e) => {
    e.preventDefault();
    setError({ ...error, otp: "" });
    if (e.target.value === "") {
      setError({ ...error, otp: "enter the otp" });
    } else {
      setLoading(true);

      isEmailOtpVerified ?
        instance.post("api/verifyphone", otpDetails).then((response) => {
          setLoading(false);
          setLogin(false);
          setOtp(false);
          SetStep(0);
          toast.success("User registration successful")
        }).catch((error) => {
          setLoading(false);
          setOtp(false)
        })
        : instance.post("api/verifyemail2n1", otpDetails).then((response) => {
          setLoading(false);
          setIsEmailOtpVerified(true);
          SetStep(Step + 1);
          setOtpDetails({ otp: "" })
          setOtp(true)
          toast.success("Email has been successfully verified")
        }).catch((error) => {
          setLoading(false);
          setOtp(false)
        });
    }
  };

  // -- Function to handle resend Otp 
  const HandleResendClick = () => {
    if (!IsTimerRunning) {
      SetTimer(60);
      SetIsTimerRunning(true);
      try {
        isEmailOtpVerified ?
          instance.post("api/otpsent_mobile", { phonenumber: userData?.phonenumber }).then((response) => {
            toast.success("OTP resent to your phone number");
          }).catch((err) => {
            console.log(err);
          })
          : instance.post("api/otpsent_email", { email: userData?.email }).then((response) => {
            toast.success("OTP resent to your email");
          }).catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }

    }
  }



  return (
    <div className={Style.form_wrapper}>
      <div className={Style.form_container}>

        <div className={Style.right_section}>
          <div className={Style.img_wrapper}>
            <img src="/Images/undraw.svg" alt="" />
          </div>
        </div>

        {otp ? (
          <div className={Style.left_section}>
            <h4 className={Style.Step_Status}>Step {Step} / 2</h4>
            <h1>Lets Authenticate</h1>
            <p> We have sent you a One Time Password to your {" "} <span> {isEmailOtpVerified ? "Phonenumber" : "Email"} </span>  </p>
            <form onSubmit={(e) => { HandleOtpVerify(e); }}>
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
              <button >
                {loading ? (<LoadingSpin size="20px" direction="alternate" width="4px" />) :
                  isEmailOtpVerified ? ("Complete Registration") : ("Continue")
                }
              </button>
            </form>
            <button className={Style.resendBtn} onClick={(e) => { HandleResendClick(e) }} disabled={IsTimerRunning}>
              {IsTimerRunning ? `Resend OTP in ${Timer}s` : "Resend One-Time Password"}
            </button>
            <p className={Style.error_para}>{error.otp}</p>
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
                  <p className={Style.error}>{error.fullname}</p>
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
                  <p className={Style.error}>{error.lastname}</p>
                </div>
              </div>

              <div className={Style.input_div}>
                <div>
                  <label htmlFor="DateofBirth">Date of Birth</label>
                  <input
                    type="date"
                    required
                    placeholder="Date of birth"
                    id="DateofBirth"
                    className={Style.dobInput}
                    max={maxDOB.toISOString().split('T')[0]}
                    min={minDOB.toISOString().split('T')[0]}
                    onChange={(e) => { dob_validation(e); }}
                  />
                  <p className={Style.error}>{error.dateOfbirth}</p>
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
                  <p className={Style.error}>{error.phonenumber}</p>
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
                  <p className={Style.error}>{error.email}</p>
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
                  <p className={Style.error}>{error.password}</p>
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
                  <p className={Style.error}>{error.confirmPassword}</p>
                </div>
              </div>

              <div>
                <p className={Style.terms}>I here by accept the
                  <Link to='/legal-and-privacy/terms&condition' className={Style.navigation} ><span >Terms Of Use</span></Link> and
                  <Link to='/legal-and-privacy' className={Style.navigation} ><span>Privacy Policy</span></Link>
                </p>
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
    </div>
  );
};

export default Signup;
