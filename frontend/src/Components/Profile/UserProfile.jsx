import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import Style from './Style.module.css'
import { FaEdit } from "react-icons/fa";
import instance from "../../instance/AxiosInstance";
import { UserContext } from '../../Contexts/UserContext';



const UserProfile = () => {


  const LoggedInUser = useContext(UserContext);
  const { User, SetUser } = LoggedInUser

  const navigate = useNavigate()

  const [UserData, SetUserData] = useState({})
  const [UserAddress, SetUserAddress] = useState({})
  const [UserImage, SetUserImage] = useState('')




  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('logged');
    localStorage.removeItem('token');
    SetUser("");
    // Redirect to the login page
    navigate('/');
  }

  useEffect(() => {
    try {
      instance.get(`/api/user/profile/get_profile/${User._id}`).then((Response) => {
        SetUserData({ ...Response.data })
        SetUserAddress(Response.data.address)
        SetUserImage(Response.data.profilePicture.url)
      }).catch((err) => {
        console.log(err)
      });
    } catch (error) {
      console.log(error);
    }

  }, [User]);


  return (
    <>
      <div className={Style.Main_Container}>
        <div className={Style.Left_Container}>

          <div className={Style.profile_section}>
            <img
              src={UserImage ?
                UserImage
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="profilepicture"
            />
            <div className={Style.items}>
              <h3>{UserData?.fullname} {UserData?.surname}</h3>
              <h4>{UserData?.email}</h4>
              <h4> {UserData?.phoneNumber}</h4>
            </div>
          </div>

          <div className={Style.info_section}>
            <h3>ACCOUNT SETTING</h3>
            <ul>
              <li ><Link className={Style.navigation} to='/wishlist'>Wishlist</Link></li>
              <li><Link className={Style.navigation} to='/myads'>My Ads</Link></li>
              <li><Link className={Style.navigation} to='/chat'>Chat</Link></li>
              <li className={Style.edit_profile} ><Link className={Style.navigation} to={`/updateprofile`} >Edit Profile</Link></li>
            </ul>
          </div>
          <div className={Style.log_section}>
            <ul>
              <li onClick={(e) => { handleLogout(e) }} ><Link className={Style.navigation} to='/'>Logout</Link></li>
            </ul>
          </div>
        </div>

        <div className={Style.Right_Container}>
          <h3>Personal Information</h3>
          <button onClick={() => navigate(`/updateprofile`)} ><FaEdit /> Edit </button>

          <div className={Style.details}>
            <h1 className={Style.itemTitle}>{UserData?.fullname} {UserData?.surname}</h1>

            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Date of Birth:</span>
              <span className={Style.itemValue}>{UserData?.dob}</span>
            </div>

            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Locality:</span>
              <span className={Style.itemValue}> {UserAddress?.locality} </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>District:</span>
              <span className={Style.itemValue}> {UserAddress?.district} </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Region:</span>
              <span className={Style.itemValue}> {UserAddress?.state} </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Country:</span>
              <span className={Style.itemValue}>{UserAddress?.region}</span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Email:</span>
              <span className={Style.itemValue}> {UserData?.email} </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Phone:</span>
              <span className={Style.itemValue}> {UserData?.phoneNumber} </span>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default UserProfile
