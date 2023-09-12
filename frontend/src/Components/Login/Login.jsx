import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import instance from "../../instance/AxiosInstance";
import Style from "./style.module.css";
import { UserContext } from '../../Contexts/UserContext'
import { AdminContext } from "../../Contexts/AdminContext";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

const Login = ({ setLogin }) => {

  const navigate = useNavigate();

  const loggedInUser = useContext(UserContext);
  const { User, SetUser } = loggedInUser

  const loggedInAdmin = useContext(AdminContext);
  const { Admin, SetAdmin } = loggedInAdmin || {}

  //const { REACT_APP_BACKEND_URL } = process.env

  const [ShowPassword, SetShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    SetShowPassword(!ShowPassword);
  };

  //Function for google authentication
  const GoogleAuthentication = () => {
    instance.get('api/auth/google')
  }

  //State for collect form data
  const [userData, setUserData] = useState({
    data: "",
    password: ""
  })

  //Function for login handler
  const loginHandler = (e) => {

    e.preventDefault();
    instance.post('/api/login', userData).then((response) => {
      console.log(response.data.user.role);
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
      console.log(error);
      toast.error("Credentials are invalid")
      navigate('/registration_login')
    })

  }


  return (
    <div className={Style.form_container}>
      <div className={Style.left_section}>
        <div className={Style.login_Details}>
          <Link className={Style.navigation} to='/'> <h1>DealNBuy</h1> </Link>
          {/* <h2>LOGIN</h2> */}
          <p>Please provide your Mobile Number or Email to Login on DealNBuy</p>
        </div>
        <form onSubmit={(e) => { loginHandler(e) }}>
          <div className={Style.input_div}>
            <label htmlFor="email/phone Number" >Email / Phone Number</label>
            <input type="text" placeholder="Email / Phone Number" required id="email/phone Number" value={userData.data} onChange={(e) => { setUserData({ ...userData, data: e.target.value }) }} />
          </div>
          <div className={Style.input_div}>
            <label htmlFor="password" >Password</label>
            {/* <div className={Style.password_input}> */}
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
            {/* </div> */}
          </div>
          <button>
            Login
          </button>
        </form>
        <div className={Style.additional_options}>
          <p><Link className={Style.navigation} to='/forgetpassword'>Forgot Password?</Link></p>
          <p>Dont have an account? <Link className={Style.navigation} onClick={() => { setLogin(true) }}>Signup</Link></p>
        </div>
        <div className={Style.Google_authentication}>
          <div className={Style.break}>
            <div />
            <p>Login With</p>
            <div />
          </div>
          <div className={Style.GoogleButton}>
            {/* onClick={GoogleAuthentication} */}
            <a href={`http://localhost:8080/api/auth/google`}> <button ><svg width="28" height="28" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30.2457 15.725H17.2549V19.5925H26.4774C26.0099 24.99 21.5191 27.2992 17.2691 27.2992C11.8432 27.2992 7.08323 23.0209 7.08323 17C7.08323 11.1917 11.6166 6.70087 17.2832 6.70087C21.6607 6.70087 24.2249 9.49171 24.2249 9.49171L26.9166 6.68671C26.9166 6.68671 23.4599 2.83337 17.1416 2.83337C9.0949 2.83337 2.87573 9.63337 2.87573 17C2.87573 24.1542 8.72657 31.1667 17.3541 31.1667C24.9332 31.1667 30.4582 25.9675 30.4582 18.2892C30.4582 16.66 30.2457 15.725 30.2457 15.725Z" fill="#10E3C2" />
            </svg>Google</button></a>
          </div>


        </div>
      </div>
      <div className={Style.right_section}>
        <div className={Style.img_wrapper}>
          <img src="/Images/undraw.svg" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
