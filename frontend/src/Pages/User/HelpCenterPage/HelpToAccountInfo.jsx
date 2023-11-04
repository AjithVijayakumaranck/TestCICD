import React, { useEffect, useState } from 'react'
import Style from "./index.module.css"
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { AiOutlineArrowUp } from "react-icons/ai";
import { TbPointFilled } from "react-icons/tb";
import Sidebar from '../../../Components/HelpCenter/Sidebar/Sidebar';



const HelpToAccountInfo = () => {

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
                                            <h2> My Account </h2>
                                        </div>
                                        <div className={Style.row}></div>
                                    </div>

                                    <div className={Style.bottom}>

                                        <div className={Style.subtitle}>
                                            <span>1.</span>
                                            <h3> What is "My Account"? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p>
                                                My Account is your personal user account where you can view and update the user
                                                profile in DealNBuy.
                                            </p>
                                        </div>

                                        <div className={Style.subtitle}>
                                            <span>2.</span>
                                            <h3>How can I Sign In to "My Account" ? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p>Sign in allows you to access your account and Ads posted on the site.</p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Click on the Login button on the top right corner of the home page.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                If you have a DealNBuy account, enter your registered email address
                                                and password to sign into your Account.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                If you don't have a DealNBuy account, you can create an account by
                                                clicking Sign Up and get registered using your email address and phone number
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                After signing in, you will be redirected Home page.On the header there is a
                                                profile section ,click on that and select My Account then you will redirected to
                                                My Account page, where you can view, edit, delete and check replies to your Ad
                                            </p>
                                        </div>


                                        <div className={Style.subtitle}>
                                            <span>3.</span>
                                            <h3> How do I update My Account Profile? </h3>
                                        </div>
                                        <div className={Style.step}>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/updateprofile.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>
                                                        As a registered user, you can edit your profile in your account by clicking
                                                        the Edit button on My Account page it will redirect to the UpdateProfile section.
                                                        Please click the Save Changes button after making the changes to store your new
                                                        details.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={Style.subtitle}>
                                            <span>4.</span>
                                            <h3> How do I change my password? </h3>
                                        </div>
                                        <div className={Style.step}>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/changepassword.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p> To change your password, please follow the steps below: </p>
                                                    <p>Sign in with your username and password and click on My Account.</p>
                                                    <p>Click on Manage  <span className={Style.bold}>My Account <span>/</span> UpdateProfile </span>
                                                        and click <span className={Style.bold}>Change Account Password</span>. Then reset your password.
                                                    </p>
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

export default HelpToAccountInfo