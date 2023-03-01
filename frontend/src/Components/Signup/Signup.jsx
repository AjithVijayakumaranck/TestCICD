import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../instance/AxiosInstance";
import Style from "./index.module.css";

import LoadingSpin from "react-loading-spin";
import { toast } from "react-toastify";

const Signup = ({ setLogin }) => {

  const navigate = useNavigate()

  //authentication option
  const [otp, setOtp] = useState(false);

  const [auth, setAuth] = useState(false);

  const maxDate = new Date().toISOString().split("T")[0];

  const [loading, setLoading] = useState(false);

  const [responseError, setResponseError] = useState("");

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
    if (/^[a-zA-Z]*$/.test(e.target.value)) {
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
    if (/^[a-zA-Z]*$/.test(e.target.value)) {
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
      console.log("not validated");
      setError({ ...error, email: "Invalid email" });
      setTimeout(() => {
        setError({ ...error, email: "" });
      }, 5000);
      return false;
    }
  };

  const phone_validation = (e) => {
    console.log(e.target.value);
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
      console.log("not validated");
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
      console.log(e.target.value, "not validated");
      setError({ ...error, dateOfbirth: "Field can't be empty" });
      setTimeout(() => {
        setError({ ...error, dateOfbirth: "" });
      }, 5000);
      return false;
    }
  };

  const password_validation = (e) => {
    console.log("im ahere");
    if (e.target.value !== "") {
      setFormError(true);
      console.log(e.target.value.length);
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
      console.log(e.target.value.length);
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

  const otp_validation = (e) => {};

  // submit handler and submit validation

  const submitHandler = (e) => {
    setResponseError("");
    e.preventDefault();
    if (formError) {
      console.log("enter proper details");
    } else {
      setLoading(true);
      if (auth) {
        instance
          .post("/api/registerphone", userData)
          .then((response) => {
            setLoading(false);
            setOtp(true);
            console.log(response, "hello phgone");
          })
          .catch((Error) => {
            setLoading(false);
            setResponseError(Error.response.data.message);
          });
      } else {
        instance
          .post("/api/register", userData)
          .then((response) => {
            setLoading(false);
            setOtp(true);
            console.log(response, "hello email");
          })
          .catch((Error) => {
            setLoading(false);
            setResponseError(Error.response.data.message);
            console.log(Error, "heee");
          });
      }
    }
  };

  const otpVerifyHandle = (e) => {
    e.preventDefault();
    setError({ ...error, otp: "" });
    if (e.target.value === "") {
      setError({ ...error, otp: "enter the otp" });
    } else {
      setLoading(true);
      auth
        ? instance
            .post("api/verifyphone", otpDetails)
            .then((response) => {
              setLoading(false);
              console.log(response,"helll");
              setLogin(false)
              setOtp(false)
              toast.success("User Regitered")
            })
            .catch((error) => {
              setLoading(false);
              console.log(error,"helllllll");
              setOtp(false)
            })
        : instance
            .post("api/verifyemail", otpDetails)
            .then((response) => {
              setLoading(false);
              console.log(response,"helloooo");
              setLogin(false)
              setOtp(false)
              toast.success("User Regitered")
            })
            .catch((error) => {
              setLoading(false);
              console.log(error,"halllllooo");
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
      <div className={Style.right_section}></div>
      {otp ? (
        <div className={Style.left_section}>
          <h1>Lets Authenticate</h1>
          <p>
            We have sent you a One Time Password to your{" "}
            {auth ? "Phonenumber" : "Email"}
          </p>
          <form
            onSubmit={(e) => {
              otpVerifyHandle(e);
            }}
          >
            <div className={Style.input_div}>
              <div>
                <label htmlFor="OTP">Enter Your Otp here</label>
                <input
                  onChange={(e) => {
                    otpHandler(e);
                  }}
                  type="number"
                  placeholder="One Time Password"
                  id="OTP"
                  value={otpDetails.otp}
                />
              </div>
            </div>
            <button>
              {loading ? (
                <LoadingSpin size="20px" direction="alternate" width="4px" />
              ) : (
                "Signup"
              )}
            </button>
            <p className={Style.error_para}>{error.otp}</p>
          </form>
        </div>
      ) : (
        <div className={Style.left_section}>
          <div className={Style.login_Details}>
            <h1>SIGNUP</h1>
            <p>Please provide your details to register on DealNBuy</p>
          </div>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className={Style.input_div}>
              <div>
                <label htmlFor="Full_name">Full name</label>
                <input
                  type="text"
                  placeholder="Fullname"
                  onChange={(e) => {
                    fullname_validation(e);
                  }}
                  required
                  id="Full_name"
                />
                <p>{error.fullname}</p>
              </div>

              <div>
                <label htmlFor="lastname">Sur name</label>
                <input
                  type="text"
                  placeholder="lastname"
                  id="lastname"
                  required
                  onChange={(e) => {
                    lastname_validation(e);
                  }}
                />
                <p>{error.lastname}</p>
              </div>
            </div>
            {auth ? (
              <div className={Style.input_div}>
                <div>
                  <label htmlFor="Phone Number">
                    Phonenumber{" "}
                    <span
                      onClick={() => {
                        setAuth(false);
                      }}
                    >
                      Using my email
                    </span>
                  </label>
                  <input
                    required
                    type="number"
                    placeholder="Phonenumber"
                    id="phonenumber"
                    maxLength="10"
                    onChange={(e) => {
                      phone_validation(e);
                    }}
                  />
                  <p>{error.phonenumber}</p>
                </div>
              </div>
            ) : (
              <div className={Style.input_div}>
                <div>
                  <label htmlFor="Email">
                    Email{" "}
                    <span
                      onClick={() => {
                        setAuth(true);
                      }}
                    >
                      Using my Phonenumber
                    </span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    id="Email"
                    onChange={(e) => {
                      email_validation(e);
                    }}
                  />
                  <p>{error.email}</p>
                </div>
              </div>
            )}

            <div className={Style.input_div}>
              <div>
                <label htmlFor="DateofBirth">Date of birth</label>
                <input
                  type="date"
                  required
                  placeholder="Date of birth"
                  id="DateofBirth"
                  max={maxDate}
                  onChange={(e) => {
                    dob_validation(e);
                  }}
                />
                <p>{error.dateOfbirth}</p>
              </div>
            </div>
            <div className={Style.input_div}>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  required
                  placeholder="Password"
                  id="password"
                  onChange={(e) => {
                    password_validation(e);
                  }}
                />
                <p>{error.password}</p>
              </div>
              <div>
                <label htmlFor="Confrim_Password">Confirm Password</label>
                <input
                  type="password"
                  required
                  placeholder="Confirm Password"
                  id="Confirm_Password"
                  onChange={(e) => {
                    confirmPassword_validation(e);
                  }}
                />
                <p>{error.confirmPassword}</p>
              </div>
            </div>
            <button>
              {loading ? (
                <LoadingSpin size="20px" direction="alternate" width="4px" />
              ) : (
                "Continue"
              )}
            </button>
            <p className={Style.error_para}>{responseError}</p>
          </form>
          <div className={Style.additional_options}>
            <p>
              Already Have Account?
              <Link
                className={Style.navigation}
                onClick={() => {
                  setLogin(false);
                }}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
