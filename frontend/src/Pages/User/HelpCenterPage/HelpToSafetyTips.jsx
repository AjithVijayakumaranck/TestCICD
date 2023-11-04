import React, { useEffect, useState } from 'react'
import Style from "./index.module.css"
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { AiOutlineArrowUp } from "react-icons/ai";
import { TbPointFilled } from "react-icons/tb";
import Sidebar from '../../../Components/HelpCenter/Sidebar/Sidebar';



const HelpToSafetyTips = () => {

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
                                            <h2> Safety Tips </h2>
                                            <p>Here are several safety guidelines to help make sure that your usage of DealNBuy
                                                is safe. While community members who use DealNBuy have success with buying, selling, renting
                                                or connecting with others. It is important we help keep our community members safe
                                                from people attempting to   scam or defraud them. We have found that one of the best ways
                                                to address this problem is to ensure that all transactions take place locally and in-person.
                                            </p>
                                        </div>
                                        <div className={Style.row}></div>
                                    </div>

                                    <div className={Style.bottom}>

                                        <div className={Style.subtitle}>
                                            <h3>We request you to take the following precautions: </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                When buying or selling, you should meet in-person to see the product.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Learn as much as you can about who you are meeting or trading with before you complete
                                                the transaction. DealNBuy is all about local transactions.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Never send or wire money to sellers or buyers.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                This includes never mailing a cheque or using wire payment services to pay for items found
                                                on DealNBuy.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Beware of Users with no reliable contact information.Including those who respond slowly or
                                                not at all.

                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                DealNBuy does not offer any sort of buyer protection.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Any emails or websites that talk about such systems are scams, even if they have the
                                                DealNBuy logo. If you receive any emails promoting these services, please forward the
                                                message to us.

                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Never provide your personal or banking information (e.g. credit card number) to others over
                                                the Internet.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Never give out your DealNBuy password, even if asked to do so in an email supposedly sent
                                                by DealNBuy.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Protect personal information.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                For example, do not share your home address unless you know the other person and want
                                                them to visit you.

                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Be aware of our Terms of Use and Prohibited Items Policy.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Read Deal Buys <Link to="/legal-and-privacy/terms&condition">Terms of Use and Policies </Link> in detail to always be one step ahead
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Make yourself aware of common scams and fraud.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Do not believe the promise of large sums of money for your help in any task.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Inform DealNBuy of any attempted fraud or suspicious emails, Ads, or other activity by
                                                community members.In case of fraud, report it to the local authorities and inform us.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                Use common sense.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                If something sounds too good to be true, it’s probably not.
                                            </p>
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

export default HelpToSafetyTips