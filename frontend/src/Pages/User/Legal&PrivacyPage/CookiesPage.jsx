import React, { useEffect } from 'react'
import Style from "./index.module.css"
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import SideMenu from '../../../Components/Legal&Privacy/SideMenu/SideMenu';
import MainMenu from '../../../Components/Legal&Privacy/MainMenu/MainMenu';


const CookiesPage = () => {

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
                <div className={Style.container}>
                    <div className={Style.left}>
                        <SideMenu />
                    </div>
                    <div className={Style.right}>
                        <MainMenu DocName="Cookies Notice" Description="Cookies Documentation" />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default CookiesPage