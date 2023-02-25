import React from "react";
import { Link } from "react-router-dom";
import Style from "./index.module.css";

const Signup = ({setLogin}) => {
  return (
    <div className={Style.form_container}>
      <div className={Style.right_section}></div>
      <div className={Style.left_section}>
        <div className={Style.login_Details}>
          <h1>SIGNUP</h1>
          <p>Please provide your details to register on DealNBuy</p>
        </div>
        <form>
          <div className={Style.input_div}>
            <div>
              <label htmlFor="Full_name">Full name</label>
              <input type="text" placeholder="Fullname" id="Full_name"
/>
            </div>

            <div>
              <label htmlFor="Surname">Sur name</label>
              <input
                type="text"
                placeholder="Surname"
                id="Surname"
              />
            </div>
          </div>
          <div className={Style.input_div}>
       <div>
       <label htmlFor="Email">Email</label>
            <input type="email" placeholder="Email" id="Email" />
       </div>
          </div>
          <div className={Style.input_div}>
          <div>
       <label htmlFor="DateofBirth">Date of birth</label>
            <input type="date" placeholder="Date of birth" id="DateofBirth" />
       </div>
      
          </div>
          <div className={Style.input_div}>
       <div>
       <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" id="password" />
       </div>
       <div>
       <label htmlFor="Confrim_Password">Confirm Password</label>
            <input type="password" placeholder="Confirm Password" id="Confirm_Password" />
       </div>
          </div>
      
          <button>Signup</button>
        </form>
        <div className={Style.additional_options}>
          <p>
            <Link className={Style.navigation}>Forgot Password?</Link>
          </p>
          <p>
            Already Have Account?<Link className={Style.navigation} onClick={()=>{setLogin(false)}}>Login</Link>
          </p>
        </div>
  
      </div>
    </div>
  );
};

export default Signup;
