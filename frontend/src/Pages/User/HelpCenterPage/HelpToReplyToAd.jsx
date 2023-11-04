import React, { useEffect, useState } from 'react'
import Style from "./index.module.css"
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { AiOutlineArrowUp } from "react-icons/ai";
import { TbPointFilled } from "react-icons/tb";
import Sidebar from '../../../Components/HelpCenter/Sidebar/Sidebar';



const HelpToReplyToAd = () => {

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
                                            <h2> Replying to the Ads </h2>
                                        </div>
                                    </div>

                                    <div className={Style.bottom}>

                                        <div className={Style.subtitle}>
                                            <span>1.</span>
                                            <h3> How do I reply to an Ad on DealNBuy? </h3>
                                        </div>

                                        <div className={Style.step}>
                                            <div className={Style.step_title}> <h5>Step 1:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/product.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>You can contact buyers or sellers by clicking on the chat button beside their listing.</p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 2:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/chat.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>You can now easily chat with the user as per your requirement.
                                                        Further, you can choose to express your offer price.
                                                    </p>
                                                    <p>Make Offer: Avoid hassle free and avoid bargaining. Just quote your price to the user & if he is
                                                        convinced you will get a simple “Yes” or “No”.
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

export default HelpToReplyToAd