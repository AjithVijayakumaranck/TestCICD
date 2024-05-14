import React from 'react'
import Style from './Style.module.css'
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom"
import { MdVerified } from "react-icons/md";




const UserProfiles = ({ UserData, UserAddress }) => {

  const navigate = useNavigate()

  return (
    <div className={Style.Right_Container}>

      <div className={Style.header}>
        <div className={Style.headerDiv}>
          <h2>Personal Information</h2>
        </div>
        <div className={Style.headerBtnDiv}>
          <button onClick={() => navigate(`/update-profile`)}> <span className={Style.icon}><FaEdit /></span>  Edit </button>
        </div>
      </div>


      <div className={Style.details}>
        <h1 className={Style.itemTitle}>{UserData?.fullname} {UserData?.surname}</h1>

        <div className={Style.detailItem}>
          <span className={Style.itemKey}>Pseudonym :</span>
          <span className={Style.itemValue}>{UserData?.pseudoName}</span>
        </div>

        <div className={Style.detailItem}>
          <span className={Style.itemKey}>Date of Birth :</span>
          <span className={Style.itemValue}>{UserData?.dob}</span>
        </div>

        <div className={Style.detailItem}>
          <span className={Style.itemKey}>House Name or Number / Flat Name or Number :</span>
          <span className={Style.itemValue}> {UserAddress?.houseName} </span>
        </div>

        <div className={Style.detailItem}>
          <span className={Style.itemKey}>Street Name :</span>
          <span className={Style.itemValue}> {UserAddress?.streetName} </span>
        </div>

        <div className={Style.detailItem}>
          <span className={Style.itemKey}>Locality :</span>
          <span className={Style.itemValue}> {UserAddress?.locality} </span>
        </div>

        <div className={Style.detailItem}>
          <span className={Style.itemKey}>District :</span>
          <span className={Style.itemValue}> {UserAddress?.district} </span>
        </div>

        <div className={Style.detailItem}>
          <span className={Style.itemKey}>State :</span>
          <span className={Style.itemValue}> {UserAddress?.state} </span>
        </div>

        <div className={Style.detailItem}>
          <span className={Style.itemKey}>Region :</span>
          <span className={Style.itemValue}>{UserAddress?.region}</span>
        </div>

        <div className={Style.detailItem}>
          <span className={Style.itemKey}>Email :</span>
          <div className={Style.itemValue}>
            <span > {UserData?.email} </span>
            {UserData.emailVerified && (
              <span className={` ${Style.verifyIcon}`} > <MdVerified /> </span>
            )}
          </div>
        </div>

        <div className={Style.detailItem}>
          <span className={Style.itemKey}>Phone :</span>
          <div className={Style.itemValue}>
            <span > {UserData?.phoneNumber} </span>
            {UserData.phoneVerified && (
              <span className={` ${Style.verifyIcon}`} > <MdVerified /> </span>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default UserProfiles
