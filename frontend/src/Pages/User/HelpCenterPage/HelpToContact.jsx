import React, { useEffect, useState } from 'react'
import Style from "./index.module.css"
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { AiOutlineArrowUp } from "react-icons/ai";
import { TbPointFilled } from "react-icons/tb";
import Sidebar from '../../../Components/HelpCenter/Sidebar/Sidebar';



const HelpToContact = () => {

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
                                            <h2> Contact Us </h2>
                                            <p>You can contact us between Monday to Friday from 10am to 6pm.</p>
                                        </div>
                                        <div className={Style.row}></div>
                                    </div>

                                    <div className={Style.bottom}>

                                        <div className={Style.subdata}>
                                            <p>
                                                To get in touch with us to share a marketing proposal, a partnership idea or want us to be your
                                                classifieds partner, please contact us at
                                                <Link to="mailto:contact.in@dealnbuy.co.in" className={Style.links}> contact.in@dealnbuy.co.in </Link>
                                                or on Contact Us page and provide us with below details in your email.
                                            </p>
                                            <p><span className={Style.point}><TbPointFilled /></span>Your name/name of company</p>
                                            <p><span className={Style.point}><TbPointFilled /></span>Your phone number</p>
                                            <p><span className={Style.point}><TbPointFilled /></span>Your proposal or idea</p>
                                            <p>In addition, if you need any help in using the site or are facing site related
                                                issues, check out our Help Centre section or contact us at
                                                <Link to="mailto:contact.in@dealnbuy.co.in" className={Style.links}>contact.in@dealnbuy.co.in</Link>
                                            </p>
                                            <p> We will get in touch with you soon.</p>
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

export default HelpToContact