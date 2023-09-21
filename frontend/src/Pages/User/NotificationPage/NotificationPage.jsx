import React, { useContext, useEffect, useState } from 'react'
import Style from "./index.module.css"
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import NotificationCard from '../../../Components/Cards/NotificationCard/NotificationCard';
import { UserContext } from '../../../Contexts/UserContext';
import authInstance from '../../../instance/AuthInstance';


const NotificationPage = () => {

    const LoggedInUser = useContext(UserContext);
    const { User, SetUser } = LoggedInUser

    const [Reload, SetReload] = useState(false);
    const [Alert, SetAlert] = useState([]);

    const location = useLocation();
    const pathSegment = location.pathname.split('/').filter((segment) => segment);

    function ScrollToTopOnMount() {
        window.scrollTo(0, 0);
        return null;
    }

    useEffect(() => {
        ScrollToTopOnMount();
    }, []);



    //Function to get Notification
    useEffect(() => {
        try {
            authInstance.get(`/api/user/notification/get_notification?userId=${User?._id}`).then((response) => {
                SetAlert(response.data)
                SetReload(false)
            })
        } catch (error) {
            console.log(error);
        }
    }, [User?._id, Reload])

    //Function to Mark Notification Readed
    const handleRead = (notificationId) => {
        authInstance.post(`/api/user/notification/mark`, { userId: User?._id, notificationId: notificationId }).then((response) => {
            SetReload(true)
        }).catch((err) => {
            console.log(err);
        })
    };


    return (
        <div className={Style.page_wrapper}>
            <ScrollToTopOnMount />
            <Navbar reload={Reload} />
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
                        {Alert.length !== 0 ?
                            <div className={Style.cardWrapper}>
                                <NotificationCard HandleRead={handleRead} Alert={Alert} User={User} />
                            </div>
                            :
                            <div className={Style.imgWrapper}>
                                <img src="/Images/message.svg" alt="" />
                            </div>
                        }
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default NotificationPage