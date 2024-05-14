import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../instance/AxiosInstance";
import Style from "./style.module.css";
import { UserContext } from '../../Contexts/UserContext'
import { AdminContext } from "../../Contexts/AdminContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import LoadingSpin from "react-loading-spin";

const Login = ({ setLogin }) => {

  const navigate = useNavigate();

  const loggedInUser = useContext(UserContext);
  const { SetUser } = loggedInUser

  const loggedInAdmin = useContext(AdminContext);
  const { SetAdmin } = loggedInAdmin || {}

  const [ShowPassword, SetShowPassword] = useState(false);
  const [otp, setOtp] = useState(false);
  const [isEmailOtpVerified, setIsEmailOtpVerified] = useState(false);

  const [loading, setLoading] = useState(false);
  const [Timer, SetTimer] = useState(60);
  const [IsTimerRunning, SetIsTimerRunning] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    SetShowPassword(!ShowPassword);
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

  //State for collect form data
  const [userData, setUserData] = useState({
    data: "",
    password: ""
  })

  const [error, setError] = useState({
    otp: "",
  });

  const [otpDetails, setOtpDetails] = useState({
    email: "",
    phonenumber: "",
    otp: "",
  });

  //Function for login handler
  const loginHandler = (e) => {
    e.preventDefault();
    instance.post('/api/login', userData).then((response) => {
      if (response.data.user.role === "superadmin" || response.data.user.role === "admin") {
        localStorage.setItem("AdminLogged", true)
        localStorage.setItem("AdminToken", response.data.token)
        SetAdmin(response.data.user)
        navigate("/admin")
      } else {
        localStorage.setItem("logged", true)
        localStorage.setItem("token", response.data.token)
        SetUser(response.data.user)
        navigate('/')
      }
    }).catch((error) => {
      if (error.response?.data?.emailStatus === false && error.response?.data?.phoneStatus === false) {
        setOtp(true);
        setOtpDetails({
          ...otpDetails,
          email: error.response?.data?.email,
          phonenumber: error.response?.data?.phoneNumber,
        });
      } else if (error.response?.data?.emailStatus === true && error.response?.data?.phoneStatus === false) {
        setIsEmailOtpVerified(true);
        setOtpDetails({
          ...otpDetails,
          phonenumber: error.response?.data?.phoneNumber,
        });
        setOtp(true);
      } else {
        toast.error("Credentials are invalid")
        navigate('/registration_login')
      }

    })
  }

  // -- To set Otp into the state
  const otpHandler = (e) => {
    setOtpDetails({
      ...otpDetails,
      otp: e.target.value,
    });
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
          toast.success("User registration successful")
        }).catch((error) => {
          setLoading(false);
          setOtp(false)
        })
        : instance.post("api/verifyemail2n1", otpDetails).then((response) => {
          setLoading(false);
          setIsEmailOtpVerified(true);
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
    <div className={Style.container}>
      <div className={Style.form_wrapper}>
        <div className={Style.form_container}>
          {otp ?
            <div className={Style.otp_section}>
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
            :
            <div className={Style.left_section}>
              <div className={Style.login_Details}>
                <Link className={Style.navigation} to='/'> <h1>DealNBuy</h1> </Link>
                <p>Please provide your Mobile Number or Email to Login on DealNBuy</p>
              </div>
              <form onSubmit={(e) => { loginHandler(e) }}>
                <div className={Style.input_div}>
                  <label htmlFor="email/phone Number" >Email / Phone Number</label>
                  <input type="text" placeholder="Email / Phone Number" required id="email/phone Number" value={userData.data} onChange={(e) => { setUserData({ ...userData, data: e.target.value }) }} />
                </div>
                <div className={Style.input_div}>
                  <label htmlFor="password" >Password</label>
                  <input
                    type={ShowPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    id="password"
                    value={userData.password}
                    onChange={(e) => { setUserData({ ...userData, password: e.target.value }) }}
                  />
                  <span
                    className={Style.eye_icon}
                    onClick={togglePasswordVisibility}
                  >
                    {ShowPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                  </span>
                </div>
                <button>
                  Login
                </button>
              </form>
              <div className={Style.additional_options}>
                <p><Link className={Style.navigation} to='/forgetpassword'>Forgot Password?</Link></p>
                <p>Dont have an account? <Link className={Style.navigation} onClick={() => { setLogin(true) }}>Signup</Link></p>
              </div>
            </div>
          }
          <div className={Style.right_section}>
            <div className={Style.img_wrapper}>
              <img src="/Images/undraw.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Login;
