import React from 'react'
import Style from './Style.module.css'
import { Blank_Profile } from '../../Assets/Constants'


const ClientProfile = ({ profile, profileaddress, image }) => {

  return (

    <div className={Style.top}>

      <div className={Style.left}>
        <h1 className={Style.title}>Information</h1>
        <div className={Style.item}>
          <img
            src={
              image
                ? image
                : Blank_Profile
            }
            className={Style.itemImg}
            alt=""
          />
          <div className={Style.details}>
            <h1 className={Style.itemTitle}>
              {profile?.showName
                ? profile?.fullname
                : profile.pseudoName
              }
            </h1>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Surname :</span>
              <span className={Style.itemValue}> {profile?.showSurname ? profile?.surname : null} </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Email :</span>
              <span className={Style.itemValue}> {profile?.showEmail ? profile?.email : null} </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Phone Number :</span>
              <span className={Style.itemValue}> {profile?.showPhonenumber ? profile?.phoneNumber : null}</span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>House Name or Number / Flat Name or Number :</span>
              <span className={Style.itemValue}> {profile?.showHouseDetails ? profileaddress?.houseName : null} </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Street Name :</span>
              <span className={Style.itemValue}> {profile?.showStreetName ? profileaddress?.streetName : null} </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Locality :</span>
              <span className={Style.itemValue}> {profile?.showAddress ? profileaddress?.locality : null} </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>District :</span>
              <span className={Style.itemValue}>{profile?.showAddress ? profileaddress?.district : null} </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>State :</span>
              <span className={Style.itemValue}> {profile?.showAddress ? profileaddress?.state : null} </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Country :</span>
              <span className={Style.itemValue}> {profile?.showAddress ? profileaddress?.region : null} </span>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default ClientProfile