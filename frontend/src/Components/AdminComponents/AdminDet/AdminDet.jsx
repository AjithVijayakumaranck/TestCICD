import React from 'react'
import Style from './Style.module.css'
import { Link } from 'react-router-dom'

const AdminDet = ({ Admin }) => {
    return (

        <div className={Style.left}>
            <Link to="/admin/profile/edit" className={Style.navigation} ><div className={Style.editButton}>Edit</div> </Link>
            <h1 className={Style.title}>Information</h1>
            <div className={Style.item}>
                <div className={Style.itemImg}>
                    <img
                        src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        alt="adminImage"
                    />
                </div>
                {Admin ?
                    <div className={Style.details}>
                        <h1 className={Style.itemTitle}>{Admin?.fullname || " "} {Admin?.surname || " "}</h1>
                        <div className={Style.detailItem}>
                            <span className={Style.itemKey}>Email:</span>
                            <span className={Style.itemValue}>{Admin?.email}</span>
                        </div>

                        <div className={Style.detailItem}>
                            <span className={Style.itemKey}>Country:</span>
                            <span className={Style.itemValue}>France</span>
                        </div>
                    </div>
                    : null
                }
            </div>
        </div>

    )
}

export default AdminDet