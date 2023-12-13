import React, { useEffect, useState } from 'react'
import Style from "./index.module.css"
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { AiOutlineArrowUp } from "react-icons/ai";
import { TbPointFilled } from "react-icons/tb";
import Sidebar from '../../../Components/HelpCenter/Sidebar/Sidebar';



const HelpToFraud = () => {

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
                                            <h2> Fraud </h2>
                                            <p>With online transactions involved it becomes very important to practice caution at every step. Be
                                                aware of some of the most common scams doing the rounds these days. We’ve put together this list
                                                to help you understand the scenario.
                                            </p>
                                        </div>
                                        <div className={Style.row}></div>
                                    </div>

                                    <div className={Style.bottom}>

                                        <div className={Style.subtitle}>
                                            <h3>Common scams and fraud: </h3>
                                        </div>
                                        
                                        <div className={Style.subdata}>

                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                <span className={Style.bold}>Brand name spoofing or phishing</span>

                                                <p>You get an email that claims to be from DealNBuy or another company and offers buyer
                                                    protection or an online payment system. These emails will typically request that you send
                                                    money via this site or provide personal information. DealNBuy and most other companies will
                                                    never send out such emails. If you send money via these sites you are likely sending money
                                                    to the fraudsters.
                                                </p>
                                            </p>

                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                <span className={Style.bold}>Overpayment</span>

                                                <p>A buyer or seller will send you a cheque and then ask for money to be returned to them.
                                                    Often the cheque will bounce and you will have lost all money you sent to the other party.
                                                </p>
                                            </p>

                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                <span className={Style.bold}>Payment for brokerage and importing</span>

                                                <p>A seller claims that there are brokerage fees, import duties, or other such fees required to
                                                    get an item into India. Do not pay such fees, as you will most often never get the product and
                                                    will have lost any money you paid. Again to remind you : DealNBuy is designed for local,
                                                    in-person trading.
                                                </p>
                                            </p>

                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                <span className={Style.bold}>Fake Escrow sites</span>

                                                <p>A buyer or seller suggests using an escrow service to complete the transaction. Often these
                                                    escrow web sites are run by fraudsters (even though they may look "official") and they will
                                                    take your money and never send you the product.
                                                </p>
                                            </p>

                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                <span className={Style.bold}>Work from home</span>

                                                <p>Many work from home offers are "pyramid schemes" which require you to recruit other
                                                    members in order to get paid. For example, an Ad may say that you can make $100 or a few
                                                    thousand rupees an hour by stuffing envelopes. But to make that money, you need to sell the
                                                    system to others.
                                                </p>
                                            </p>

                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                <span className={Style.bold}>419 Scams</span>

                                                <p>You get an email saying that your help is needed to help take money out of a country and
                                                    that you will be paid a commission for your help. Finally, they will ask you for money to help
                                                    them take the large amount of money out of the country and once you pay you will never
                                                    hear from them again.
                                                </p>
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

export default HelpToFraud