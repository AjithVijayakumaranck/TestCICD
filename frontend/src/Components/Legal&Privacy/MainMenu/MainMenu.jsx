import React, { useState } from 'react'
import Style from "./index.module.css"
import instance from '../../../instance/AxiosInstance';
import { toast } from 'react-toastify';

const MainMenu = ({ DocName, Description }) => {



    return (
        <div className={Style.content_wrapper}>
            <div className={Style.container}>
                <div className={Style.row}>
                    <div className={Style.top}>
                        <div className={Style.title}>
                            <h2> {DocName} </h2>
                            <p> {Description} </p>
                        </div>
                        <div className={Style.row}></div>
                    </div>
                    <div className={Style.bottom}>
                        <div className={Style.subtitle}>
                            <span>1.</span>
                            <h3> General </h3>
                        </div>
                        <div className={Style.subdata}>
                            <p>
                                <span> 1.1</span> Hey H&M friend, welcome to our terms and conditions! We are so happy you've made it here.
                                This may not be the most exciting document you'll ever read, but it is important to establish
                                what you can expect from us and what we expect from you. And just to be clear, when we say
                                "us", "we" or " H&M", we mean H&M Hennes & Mauritz Retail Private Limited .
                            </p>
                            <p>
                                <span> 1.2</span> These terms and conditions apply when you place an order with us via the website www2.
                                hm.com, or our mobile application the H&M App (from now on referred together to as the "Online
                                Store").
                            </p>

                            <p>
                                <span> 1.3</span> By placing your order you agree to be bound by these terms and conditions, or the "Terms"
                                as we will call them from now on. Therefore, please make sure you have read and understood them
                                before ordering.
                            </p>
                            <p>
                                <span> 1.4</span> Only persons who can enter into legally binding contract under the Indian Contract Act,
                                1872 can use and/or transact on the Online Store. Also, meaning that you must be at least 18
                                years old or above. If you are under 18 years, you may use and/or transact on the Online
                                Store only with the involvement of a parent or a guardian. You must also have a valid email
                                address and a delivery address in India.
                            </p>
                            <p>
                                <span> 1.5</span> You may not place an order for corporate, commercial or self-employed activities. We do
                                not issue commercial  Goods and Services Tax (GST) invoices for corporate use.
                            </p>
                            <p>
                                <span> 1.6</span> H&M wants to provide the best possible online experience. To make this possible we need
                                to ensure that our services runs like a clockwork. You understand and agree not to (i) post,
                                transmit, redistribute, upload, or promote any communications or content that could harm
                                or negatively impact our business, products or services; (ii) act in a manner or employ
                                any device that restricts, impairs, interferes or inhibits any other user from using or
                                enjoying the hm.com site, or which impacts the security of the site, or (iii) employ any
                                device or attempt to use any engine, software, tool, agent, script or other device or
                                mechanism (including without limitation spiders, bots, crawlers, avatars or intelligent
                                agents) to navigate or search the site, or to copy content from the site. We reserve the
                                right to immediately bar access to the site and close the account of a user who violates
                                any of the provisions of these terms and conditions or whose acts,as per H&M’s understanding,
                                are detrimental to the interests of H&M in any manner.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default MainMenu