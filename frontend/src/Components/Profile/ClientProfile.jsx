import React from 'react'
import Style from './Style.module.css'


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
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            className={Style.itemImg}
            alt=""
          />
          <div className={Style.details}>
            <h1 className={Style.itemTitle}> {profile?.fullname} {profile?.surname}</h1>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Email:</span>
              <span className={Style.itemValue}>{profile?.email}</span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Phone:</span>
              <span className={Style.itemValue}> {profile?.phoneNumber}</span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Address:</span>
              <span className={Style.itemValue}>
                {profileaddress?.locality || ''} {profileaddress?.district || ''} {profileaddress?.state || ''}
              </span>
            </div>
            <div className={Style.detailItem}>
              <span className={Style.itemKey}>Country:</span>
              <span className={Style.itemValue}>{profileaddress?.region}</span>
            </div>
          </div>
        </div>
      </div>

    </div>

  )
}

export default ClientProfile