import React, { useEffect } from 'react'
import Style from "./index.module.css"
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { AiOutlineArrowUp } from "react-icons/ai";
import { TbPointFilled } from "react-icons/tb";
import Sidebar from '../../../Components/HelpCenter/Sidebar/Sidebar';



const HelpToPostingAd = () => {

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
                                            <h2> Posting Ads </h2>
                                        </div>
                                    </div>


                                    <div className={Style.bottom}>
                                        <div className={Style.subtitle}>
                                            <span>1.</span>
                                            <h3> How do I Post an Ad ? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p>
                                                Posting an ad on DealNBuy is very easy and takes not more than 30 seconds.
                                                Simply follow the steps below to understand the Post Ad flow better.
                                            </p>
                                        </div>
                                        <div className={Style.step}>

                                            <div className={Style.step_title}> <h5>Step 1:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/Header_postbtn.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Click on the Post Ad button on the header of all DealNBuy pages.</p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 2:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/postAd.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Select Category & Sub Category.</p>
                                                    <p>Choose the right category and sub-category as given below to match
                                                        the product or service you wish to sell or promote. For eg. If you
                                                        are selling a car, then you should post your Ad in the category
                                                        Auto(Cars) and Sub category Cars.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 3:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/title.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p> Basic Details Section </p>
                                                    <p> You have an option to choose another category if you wish. </p>
                                                    <p> Make sure you fill in all the mandatory fields through the form. </p>
                                                    <p> The Title should preferably include specifics about your Product. For example, if
                                                        you’re trying to sell a car, you need to mention the Brand, Model, Year , Mileage, Fuel
                                                        Type, Locality, etc. This helps your Ad become more noticeable. </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 4:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/Image_section.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Upload Pictures of the product</p>
                                                    <p>You have the option of uploading up to 10 pictures of your Product
                                                        to make the Ad more attractive. The first image will be used as a cover
                                                        photo wherever the Ad appears across the site. Ads with pictures attract 50%
                                                        more responses.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 6:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/Description.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Product Details</p>
                                                    <p>Give enough information about your item or service to help a potential
                                                        buyer know more about your item and help your chances of getting quality
                                                        responses.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 5:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/Dealer_details.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Seller Information</p>
                                                    <p>Add information about the person such as either dealer or Owner
                                                        and other information like locality ,district, country etc.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 6:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/Subscription.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Premium Ads</p>
                                                    <p>To help your Ad gain more visibility you can always convert it to
                                                        a Premium Ad by paying a small amount.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className={Style.step_title}> <h5>Step 7:</h5></div>
                                            <div className={Style.step_wrapper}>
                                                <div className={Style.step_img}>
                                                    <img src="/helpCenter/postbtn.png" alt="img" />
                                                </div>
                                                <div className={Style.step_content}>
                                                    <p>Click the Post button.</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={Style.subtitle}>
                                            <span>2.</span>
                                            <h3> What do I need to do if my location is not in the list? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p>
                                                If your location is not present on DealNBuy, you may enter the location closest
                                                to you in the list. Mentioning your correct location will help people who see
                                                your Ad know where you, your product or service is located.
                                            </p>
                                        </div>

                                        <div className={Style.subtitle}>
                                            <span>3.</span>
                                            <h3>  How much does it cost to post an Ad on DealNBuy? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p>
                                                DealNBuy is a free service upto 10 Ads and does not charge you any fees to
                                                post Ads.For more Ads you need to subscribe to the plan. Go ahead and enjoy it. All
                                                Ads are subject to meeting the
                                                <Link to="/legal-and-privacy/terms&condition" className={Style.links}>Terms of Use</Link>
                                                and <Link to="/help-center/" className={Style.links}>Prohibited Items Policy</Link>.
                                            </p>
                                        </div>

                                        <div className={Style.subtitle}>
                                            <span>4.</span>
                                            <h3> How can I post a Good Ad on DealNBuy and get better responses? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                <span className={Style.bold}>Title -</span>
                                                A good title will attract more visitors to your Ad. Mention important
                                                keywords in the title.
                                            </p>

                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                <span className={Style.bold}> Description -</span>
                                                To get people interested, follow these simple tips.Make the description
                                                as detailed as possible.
                                            </p>
                                            <p> <span className={Style.point}><TbPointFilled /></span>
                                                Make it easy for buyers to pick up the item by mentioning the location of
                                                the item and when you would be available.
                                            </p>
                                            <p> <span className={Style.point}><TbPointFilled /></span>
                                                Add contact information.
                                            </p>
                                            <p>
                                                <span className={Style.point}><TbPointFilled /></span>
                                                <span className={Style.bold}> Upload Images - </span>
                                                Include upto 10 pictures to enhance your Ad.
                                            </p>
                                            <p> <span className={Style.point}><TbPointFilled /></span>
                                                Use these tips and other innovative ideas to make your Ad more attractive and
                                                increase your chances of getting replies. In addition you can also subscribe to
                                                DealNBuy  <Link to="/subscribe" className={Style.links}>Subscription Plan</Link>.
                                            </p>
                                        </div>
                                        <div className={Style.subtitle}>
                                            <span>4.</span>
                                            <h3> Is there any limit on Posting Ads? </h3>
                                        </div>
                                        <div className={Style.subdata}>
                                            <p>You can post up to 10 different Ads in the basic plan.</p>
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

export default HelpToPostingAd