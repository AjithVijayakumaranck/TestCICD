import React, { useContext, useEffect, useState } from 'react'
import Style from "./Style.module.css"
import { useLocation} from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb';
import Navbar from '../../../Components/Navbar/Navbar';
import Footer from '../../../Components/Footer/Footer';
import { UserContext } from '../../../Contexts/UserContext';
import SideProfile from '../../../Components/Profile/SideProfile';
import UserProfiles from '../../../Components/Profile/UserProfile';
import instance from '../../../instance/AxiosInstance';



const UserProfile = () => {



    const location = useLocation();
    const pathSegment = location.pathname.split('/').filter((segment) => segment);

    const LoggedInUser = useContext(UserContext);
    const { User, SetUser } = LoggedInUser

    const [UserData, SetUserData] = useState({})
    const [UserAddress, SetUserAddress] = useState({})
    const [UserImage, SetUserImage] = useState('')

    useEffect(() => {
        try {
            instance.get(`/api/user/profile/get_profile/${User._id}`).then((Response) => {
                SetUserData({ ...Response.data })
                SetUserAddress(Response.data.address)
                SetUserImage(Response.data?.profilePicture?.url)
            }).catch((err) => {
                console.log(err)
            });
        } catch (error) {
            console.log(error);
        }

    }, [User]);

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
                        <SideProfile UserData={UserData} UserImage={UserImage} />
                    </div>
                    <div className={Style.Right_Section}>
                        <UserProfiles UserData={UserData} UserAddress={UserAddress} />
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default UserProfile