import React, { useContext, useEffect, useState } from 'react'
import Style from "./index.module.css"
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import NotificationCard from '../../../Components/Cards/NotificationCard/NotificationCard';
import { UserContext } from '../../../Contexts/UserContext';
import authInstance from '../../../instance/AuthInstance';
import NotificationModal from '../../../Components/Notification_Modal/Modal'
import Backlogo from "../../../Assets/Icons/Back"
import Logo from '../../../Assets/Images/logo.webp'
import TimeAgo from "react-timeago";

const NotificationPage = () => {

  const LoggedInUser = useContext(UserContext);
  const { User, SetUser } = LoggedInUser

  const [Reload, SetReload] = useState(false);
  const [Alert, SetAlert] = useState([]);
  const [isOpen, SetIsOpen] = useState(false)

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

  const openModal = () => {
    SetIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    SetIsOpen(false);
    document.body.style.overflow = 'auto';
   
    
  };

  console.log(alert, "not data")

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
            {Alert.length !== 0 ? (
              <div className={Style.cardWrapper} onClick={openModal}>
                <NotificationCard
                  HandleRead={handleRead}
                  Alert={Alert}
                  User={User}
                />
              </div>
            ) : (
              <div className={Style.imgWrapper}>
                <img src="/Images/message.svg" alt="" />
              </div>
            )}
          </div>
        </div>
        <NotificationModal isOpen={isOpen} onClose={closeModal}>

          {Alert.map((alert, index) => {

            return (
              <div className={Style.modal_wrapper}>
                
                <div className={Style.modal_container} key={index}>
                <div className={Style.closeIcon_wrapper} onClick={closeModal}>
                  <Backlogo className={Style.back_logo}/>
                </div>
                  <div className={Style.left_container}>
                    <div className={Style.modal_img}>
                      <img src={Logo} alt="notification logo" />
                    </div>
                  </div>
                  <div className={Style.right_container}>
                    <h6>{alert?.notification}</h6>
                    <p>Notification message</p>
                    <span className={Style.time_shower}> <TimeAgo date={alert?.createdAt} minPeriod={60} /> </span>
                  </div>
                </div>

              </div>
            );
          })}

        </NotificationModal>

        <Footer />
      </div>
    </div>
  );
}

export default NotificationPage