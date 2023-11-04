import React, { useEffect } from 'react'
import Style from "./index.module.css"
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { AiOutlineArrowUp } from "react-icons/ai";
import { } from "react-icons/io";
import Sidebar from '../../../Components/HelpCenter/Sidebar/Sidebar';



const HelpToRegister = () => {

    const location = useLocation();

    const pathSegment = location.pathname.split('/').filter((segment) => segment);

    const ScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    function ScrollToTopOnMount() {
        window.scrollTo(0, 0);
        return null;
    }

    useEffect(() => {
        ScrollToTopOnMount();
    }, []);



    return (
        <div className={Style.page_wrapper}>
            <ScrollToTopOnMount />
            <Navbar />
            <div className={Style.main}>
                <Breadcrumb pathSegments={pathSegment} />
                <div className={Style.container}>
                    <div className={Style.To_top} onClick={ScrollToTop} > <AiOutlineArrowUp /></div>
                    <div className={Style.left}>
                        <Sidebar />
                    </div>
                    <div className={Style.right}>
                        <div className={Style.content_wrapper}>
                            <div className={Style.container_wrap}>
                                <div className={Style.row}>
                                    <div className={Style.top}>
                                        <div className={Style.title}>
                                            <h2> Registration and Login </h2>
                                            <p>
                                                Registration provides recognition! Registering on DealNBuy is just a one-click
                                                work. We will keep you signed in and make your work easier and simpler.
                                            </p>
                                        </div>
                                        <div className={Style.row}></div>
                                    </div>


                                    <div className={Style.bottom}>
                                        <div className={Style.subtitle}>
                                            <span>1.</span>
                                            <h3> How do I register on DealNBuy ? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p>
                                                Registering on DealNBuy is now a very simple process. It takes only 1 minutes
                                                to register and post your Ads.
                                            </p>
                                        </div>
                                        <div className={Style.step}>

                                            <div className={Style.step_title}> <h5>Step 1:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/Header_login.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Click “Login” tab in the top corner of the website.</p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 2:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/signup_btn.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Please select your Sign Up option from the bottom of login page.</p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 3:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/signup.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>
                                                        You can enter your details correctly. Details include
                                                        firstname, lastname, date of birth, phonenumber, email, password.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 4:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/otp.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>
                                                        Once you submit the above information, you will be directed to the Mobile & Email
                                                        verification page.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 6:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_content}>
                                                    <p>
                                                        Once the verification is done through OTP/email link, you become a registered user
                                                        of the site and can post Ads, manage your Ads and participate in community discussions.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 5:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_content}>
                                                    <p>
                                                        Once registered you can now use your credentials to login to your DealNBuy
                                                        Account.
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                        <div className={Style.subtitle}>
                                            <span>2.</span>
                                            <h3> Do I need to register to post Ads? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p>
                                                Yes, you need to be a registered user to Post Ad on the site.
                                            </p>
                                        </div>
                                        <div className={Style.subtitle}>
                                            <span>3.</span>
                                            <h3> What are the benefits of registering on DealNBuy? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p> Get your own User Id </p>
                                            <p> Edit, delete, repost and check replies to your Ads</p>
                                            <p> Helps you participate in the community discussions</p>
                                        </div>
                                        <div className={Style.subtitle}>
                                            <span>4.</span>
                                            <h3> How should I Sign In on DealNBuy? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p> Sign in allows you to access your account and Ads posted on the site. </p>
                                        </div>

                                        <div className={Style.step}>
                                            <div className={Style.step_title}> <h5>Step 1:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/Header_login.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Click “Login” tab in the top corner of the website.</p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 2:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/Login.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>If you have a DealNBuy account, enter your registered mobile
                                                        number/email address and password to sign into your account.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={Style.subtitle}>
                                            <span>5.</span>
                                            <h3> How do I create a password for the first time? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p> You can enter numeric or alphanumeric characters. To ensure the security of your
                                                password, password should be in length of 6-16 characters. Please don’t use your
                                                birthday or simple numbers like 123456 or abcdef as password. Please change your
                                                password after a certain period. You can change your password in
                                                <Link to="/updateprofile" className={Style.links}> My Account <span>/</span> Update Profile <span>/</span> Change My Password </Link>. </p>
                                        </div>

                                        <div className={Style.subtitle}>
                                            <span>6.</span>
                                            <h3> I forgot my password. How do I get a new one? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p> You can reclaim your password if you have forgotten it. Registered users who
                                                forgot their password can reclaim their passwords and reset their new password
                                                in DealNBuy. </p>
                                        </div>

                                        <div className={Style.step}>
                                            <div className={Style.step_title}> <h5>Step 1:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/mark_forgotten.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>
                                                        Click “Forgot your password?” link on the Sign In panel and it will display a page
                                                        to “Create a new Password”.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 2:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/forgotten.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>
                                                        Fill in your registration email address/mobile number to get the password, and click
                                                        the“Continue” button.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 3:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/Reset_Otp_section.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p> It will display a “verify otp page”:  </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 4:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/reset_password.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>  after verifying otp it redirects to the “reset password page” </p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div >
    )
}

export default HelpToRegister