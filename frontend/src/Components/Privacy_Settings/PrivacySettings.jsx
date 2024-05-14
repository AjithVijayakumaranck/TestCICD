import React, { useContext, useEffect, useState } from 'react'
import Style from './Style.module.css'
import authInstance from '../../instance/AuthInstance';
import { UserContext } from '../../Contexts/UserContext';


// -- Toggle Button Code
const ToggleButton = ({ isChecked, onChange }) => (

  <label className={Style.switch}>
    <input
      type="checkbox"
      checked={isChecked}
      onChange={onChange}
    />
    <span className={Style.slider}></span>
  </label>

);



const PrivacySettings = ({ UserId }) => {

  const LoggedInUser = useContext(UserContext);
  const { User } = LoggedInUser

  // -- States

  const [PrivacySetting, SetPrivacySetting] = useState({});


  // -- Get Intial State of Toggle Button
  useEffect(() => {
    try {
      authInstance.get(`/api/user/profile/get_profile/${User?._id}`).then((Response) => {
        SetPrivacySetting({
          showName: Response.data?.showName,
          showSurname: Response.data?.showSurname,
          showDob: Response.data?.showDob,
          streetName: Response.data?.showStreetName,
          showEmail: Response.data?.showEmail,
          showPhonenumber: Response.data?.showPhonenumber,
          houseDetails: Response.data?.showHouseDetails,
          showAddress: Response.data?.showAddress,
        })
      }).catch((err) => {
        console.log(err)
      });
    } catch (error) {
      console.log(error);
    }

  }, [UserId]);



  const HandleToggleMenu = (field) => {
    // Toggle the state based on the field provided (ShowName, ShowDob, etc.)
    switch (field) {
      case 'ShowName':
        SetPrivacySetting(prevState => ({
          ...prevState,
          showName: !prevState.showName
        }));
        break;
      case 'ShowSurname':
        SetPrivacySetting(prevState => ({
          ...prevState,
          showSurname: !prevState.showSurname
        }));
        break;
      case 'ShowDob':
        SetPrivacySetting(prevState => ({
          ...prevState,
          showDob: !prevState.showDob
        }));
        break;
      case 'ShowStreetName':
        SetPrivacySetting(prevState => ({
          ...prevState,
          streetName: !prevState.streetName
        }));
        break;
      case 'ShowEmail':
        SetPrivacySetting(prevState => ({
          ...prevState,
          showEmail: !prevState.showEmail
        }));
        break;
      case 'ShowPhone':
        SetPrivacySetting(prevState => ({
          ...prevState,
          showPhonenumber: !prevState.showPhonenumber
        }));
        break;
      case 'ShowHouseDetails':
        SetPrivacySetting(prevState => ({
          ...prevState,
          houseDetails: !prevState.houseDetails
        }));
        break;
      case 'ShowAddress':
        SetPrivacySetting(prevState => ({
          ...prevState,
          showAddress: !prevState.showAddress
        }));
        break;
      default:
        break;
    }
  }


  // -- Change the Status of Toggle Button in Database

  useEffect(() => {
    try {
      authInstance.put('/api/user/profile/update_privacy', { userId: User?._id, toggleValues: PrivacySetting }).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  }, [HandleToggleMenu]);





  return (
    <div className={Style.Container}>

      <div className={Style.header}>
        <div className={Style.headerDiv}>
          <h2>Privacy Settings</h2>
        </div>
      </div>


      <div className={Style.details}>

        <div className={Style.detailItem}>
          <div className={Style.title}>
            <h3>Show First Name Information</h3>
            <p>Allow users to hide their first name from their profile.</p>
          </div>
          <div className={Style.toggleBtnDiv}>
            <ToggleButton isChecked={PrivacySetting.showName} onChange={() => HandleToggleMenu('ShowName')} />
          </div>
        </div>

        <div className={Style.detailItem}>
          <div className={Style.title}>
            <h3>Show Last Name Information</h3>
            <p>Allow users to hide their last name from their profile.</p>
          </div>
          <div className={Style.toggleBtnDiv}>
            <ToggleButton isChecked={PrivacySetting.showSurname} onChange={() => HandleToggleMenu('ShowSurname')} />
          </div>
        </div>

        <div className={Style.detailItem}>
          <div className={Style.title}>
            <h3>Show Date of Birth Information</h3>
            <p>Allow users to hide their date of birth from their profile.</p>
          </div>
          <div className={Style.toggleBtnDiv}>
            <ToggleButton isChecked={PrivacySetting.showDob} onChange={() => HandleToggleMenu('ShowDob')} />
          </div>
        </div>

        <div className={Style.detailItem}>
          <div className={Style.title}>
            <h3>Show Address Information</h3>
            <p>Allow users to hide their address from their profile.</p>
          </div>
          <div className={Style.toggleBtnDiv}>
            <ToggleButton isChecked={PrivacySetting.showAddress} onChange={() => HandleToggleMenu('ShowAddress')} />
          </div>
        </div>

        <div className={Style.detailItem}>
          <div className={Style.title}>
            <h3>Show House / Flat Name or Number Information</h3>
            <p>Allow users to hide their house / flat name or number from their profile.</p>
          </div>
          <div className={Style.toggleBtnDiv}>
            <ToggleButton isChecked={PrivacySetting.houseDetails} onChange={() => HandleToggleMenu('ShowHouseDetails')} />
          </div>
        </div>

        <div className={Style.detailItem}>
          <div className={Style.title}>
            <h3>Show Street Name Information</h3>
            <p>Allow users to hide their street name from their profile.</p>
          </div>
          <div className={Style.toggleBtnDiv}>
            <ToggleButton isChecked={PrivacySetting.streetName} onChange={() => HandleToggleMenu('ShowStreetName')} />
          </div>
        </div>

        <div className={Style.detailItem}>
          <div className={Style.title}>
            <h3>Show Email Information</h3>
            <p>Allow users to hide their email from their profile.</p>
          </div>
          <div className={Style.toggleBtnDiv}>
            <ToggleButton isChecked={PrivacySetting.showEmail} onChange={() => HandleToggleMenu('ShowEmail')} />
          </div>
        </div>

        <div className={Style.detailItem}>
          <div className={Style.title}>
            <h3>Show Phone Number Information</h3>
            <p>Allow users to hide their phone number from their profile.</p>
          </div>
          <div className={Style.toggleBtnDiv}>
            <ToggleButton isChecked={PrivacySetting.showPhonenumber} onChange={() => HandleToggleMenu('ShowPhone')} />
          </div>
        </div>


      </div>

    </div>
  )
}

export default PrivacySettings
