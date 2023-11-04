import React, { useEffect, useState } from 'react'
import Style from "./index.module.css"
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { AiOutlineArrowUp } from "react-icons/ai";
import { TbPointFilled } from "react-icons/tb";
import Sidebar from '../../../Components/HelpCenter/Sidebar/Sidebar';



const HelpToSearch = () => {

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
                                            <h2> Search and Browse </h2>
                                        </div>
                                    </div>

                                    <div className={Style.bottom}>
                                        <div className={Style.subtitle}>
                                            <span>1.</span>
                                            <h3> How do I find an Ad for a specific item or service on DealNBuy? </h3>
                                        </div>

                                        <div className={Style.step}>
                                            <div className={Style.step_title}> <h5>Step 1:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/search.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Keyword Search.</p>
                                                    <p> To find an Ad for a specific item or service on DealNBuy, you need to
                                                        enter relevant or exact keywords in the search bar shown below.
                                                        It will display results matching the same.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 2:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/category.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Choose Category.</p>
                                                    <p>You can also choose a category from those mentioned on the home page.</p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 3:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_content}>
                                                    <p>Search Bar not Case-Sensitive</p>
                                                    <p>If you type "nike" or "NIKE", the search result would be the same.
                                                        Our Search bar is not case-sensitive.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 4:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_content}>
                                                    <p>Make use of Space </p>
                                                    <p>If you have more than one keyword, there is no need to include "and"
                                                        between keywords, just use space.
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

export default HelpToSearch