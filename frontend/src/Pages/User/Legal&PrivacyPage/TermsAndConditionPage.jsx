import React, { useEffect, useState } from 'react'
import Style from "./index.module.css"
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import SideMenu from '../../../Components/Legal&Privacy/SideMenu/SideMenu';
import MainMenu from '../../../Components/Legal&Privacy/MainMenu/MainMenu';
import instance from '../../../instance/AxiosInstance';


const TermsAndConditionPage = () => {

    const location = useLocation();
    const [Documents, SetDocuments] = useState({});
    const [Name, SetName] = useState("Terms and Conditions");

    const pathSegment = location.pathname.split('/').filter((segment) => segment);

    function ScrollToTopOnMount() {
        window.scrollTo(0, 0);
        return null;
    }

    useEffect(() => {
        ScrollToTopOnMount();
    }, []);

    //Load Documents functions
    useEffect(() => {
        try {
            instance.get(`/api/super_admin/terms/get_term?name=${Name}`).then((response) => {
                SetDocuments(response.data);
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
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
                        <MainMenu Data={Documents} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default TermsAndConditionPage