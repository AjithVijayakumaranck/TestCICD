import React, { useEffect } from 'react'
import Style from "./index.module.css"
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import NotificationCard from '../../../Components/Cards/NotificationCard/NotificationCard';


const NotificationPage = () => {

    const location = useLocation();
    const pathSegment = location.pathname.split('/').filter((segment) => segment);

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
                <div className={Style.productwrapper}>
                    <div className={Style.container}>
                        <div className={Style.heading}>
                            <div className={Style.left}>
                                <h2>Notification</h2>
                            </div>
                            <div className={Style.right}>
                                <span></span>
                            </div>
                        </div>
                        <div className={Style.cardWrapper}>
                            <NotificationCard />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default NotificationPage