import React, { useContext, useEffect } from 'react'
import Style from "./Style.module.css"
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { UserContext } from '../../../Contexts/UserContext';
import SideProfile from '../../../Components/Profile/SideProfile';
import PrivacySettings from '../../../Components/Privacy_Settings/PrivacySettings';



const Settings = () => {


    const location = useLocation();
    const pathSegment = location.pathname.split('/').filter((segment) => segment);

    const LoggedInUser = useContext(UserContext);
    const { User, SetUser } = LoggedInUser

   

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
                <div className={Style.Main_Container}>
                    <div className={Style.Left_Section}>
                        <SideProfile CustomNav="Profile" CustomNavLink='/profile'/>
                    </div>
                    <div className={Style.Right_Section}>
                        <PrivacySettings />
                    </div>

                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Settings