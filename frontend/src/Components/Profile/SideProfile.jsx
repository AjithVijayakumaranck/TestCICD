import React, { useContext } from 'react'
import Style from './Style.module.css'
import { Blank_Profile } from '../../Assets/Constants'
import { UserContext } from '../../Contexts/UserContext';
import { Link, useNavigate } from 'react-router-dom';

const SideProfile = ({ UserData, UserImage, CustomNav, CustomNavLink }) => {

    const LoggedInUser = useContext(UserContext);
    const { User, SetUser } = LoggedInUser

    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.removeItem('logged');
        localStorage.removeItem('token');
        SetUser("");
        // Redirect to the login page
        navigate('/');
    }

    return (
        <div className={Style.Left_Container}>

            <div className={Style.profile_section}>
                <img
                    src={UserImage ?
                        UserImage
                        : Blank_Profile
                    }
                    alt="profilepicture"
                />
                <div className={Style.items}>
                    <h3>{UserData?.fullname} {UserData?.surname}</h3>
                    <h4>{UserData?.email}</h4>
                    <h4>{UserData?.phoneNumber}</h4>
                </div>
            </div>

            <div className={Style.info_section}>
                <h3>ACCOUNT SETTING</h3>
                <ul>
                    {CustomNav && (
                        <Link className={Style.navigation} to={CustomNavLink}><li >{CustomNav}</li></Link>
                    )}
                    <Link className={Style.navigation} to='/wishlist'><li >Wishlist</li></Link>
                    <Link className={Style.navigation} to='/myads'><li>My Ads</li></Link>
                    <Link className={Style.navigation} to='/chat'><li>Chat</li></Link>
                    <Link className={Style.navigation} to='/profile/privacy-settings'><li className={`${window.location.pathname === '/profile/privacy-settings' ? Style.active : null}`}>Privacy Settings</li></Link>
                    <Link className={`${Style.navigation} ${Style.edit_profile}`} to={`/update-profile`} ><li>Edit Profile</li></Link>
                </ul>
            </div>
            <div className={Style.log_section}>
                <ul>
                    <li onClick={(e) => { handleLogout(e) }} >Logout</li>
                </ul>
            </div>
        </div>
    )
}

export default SideProfile