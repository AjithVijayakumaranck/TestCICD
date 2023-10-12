import React, { useEffect, useState } from 'react'
import Style from "./index.module.css"
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import ContactForm from '../../../Components/ContactForm/ContactForm';
import SideMenu from '../../../Components/Legal&Privacy/SideMenu/SideMenu';
import MainMenu from '../../../Components/Legal&Privacy/MainMenu/MainMenu';
import instance from '../../../instance/AxiosInstance';


const CookiesPage = () => {

    const location = useLocation();
    const [Documents, SetDocuments] = useState([]);

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
            instance.get("/api/super_admin/term/get_term").then((response) => {
                SetDocuments([response.data]);
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }, []);

    const Result = Documents.find(document => document.name === 'Cookies Notice');

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
                        <MainMenu Data={Result} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default CookiesPage