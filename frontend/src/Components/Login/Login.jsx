import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../instance/AxiosInstance";
import Style from "./style.module.css";

const Login = ({setLogin}) => {
 const navigate = useNavigate()

  const GoogleAuthentication = () => {
    instance.get('auth/google')
  }

  const [userData,setUserData] = useState({
    data:"",
    password:""  
  })

  const loginHandler = (e) => {
    console.log("hello9 login");
    e.preventDefault();
    
    instance.post('api/login',userData).then((response)=>{
      console.log(response);
      navigate('/')
    }).catch((error)=>{
      console.log(error);
      navigate('/registration_login')
    })
  }


  return (
    <div className={Style.form_container}>
      <div className={Style.left_section}>
        <div className={Style.login_Details}>
          <h1>LOGIN</h1>
          <p>Please provide your Mobile Number or Email to Login on DealNBuy</p>
        </div>
        <form onSubmit={(e)=>{loginHandler(e)}}>
          <div className={Style.input_div}>
            <label htmlFor="email/phonenumber" >Email / Phonenumber</label>
            <input type="text" placeholder="email / password" require id="email/phonenumber" value={userData.data} onChange={(e)=>{setUserData({...userData,data:e.target.value})}}/>
          </div>
          <div className={Style.input_div}>
            <label htmlFor="password" >password</label>
            <input type="password" placeholder="password" require id="password" value={userData.password} onChange={(e)=>{setUserData({...userData,password:e.target.value})}} />
          </div>
          <button>
            Login
          </button>
        </form>
        <div className={Style.additional_options}>
          <p><Link className={Style.navigation}>Forgot Password?</Link></p>
          <p>Dont have an account?<Link className={Style.navigation} onClick={()=>{setLogin(true)}}>Signup</Link></p>
        </div>
        <div className={Style.Google_authentication}>
          <div className={Style.break}>
          <div/>
          <p>Login With</p>
          <div/>
          </div>
          <div className={Style.GoogleButton}>
          {/* onClick={GoogleAuthentication} */}
          <a href="http://localhost:8080/auth/google"> <button ><svg width="28" height="28" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30.2457 15.725H17.2549V19.5925H26.4774C26.0099 24.99 21.5191 27.2992 17.2691 27.2992C11.8432 27.2992 7.08323 23.0209 7.08323 17C7.08323 11.1917 11.6166 6.70087 17.2832 6.70087C21.6607 6.70087 24.2249 9.49171 24.2249 9.49171L26.9166 6.68671C26.9166 6.68671 23.4599 2.83337 17.1416 2.83337C9.0949 2.83337 2.87573 9.63337 2.87573 17C2.87573 24.1542 8.72657 31.1667 17.3541 31.1667C24.9332 31.1667 30.4582 25.9675 30.4582 18.2892C30.4582 16.66 30.2457 15.725 30.2457 15.725Z" fill="#10E3C2"/>
          </svg>Google</button></a>
          </div>
        

        </div>
      </div>
      <div className={Style.right_section}>
  
      </div>
    </div>
  );
};

export default Login;
