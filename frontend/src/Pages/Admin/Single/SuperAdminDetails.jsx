import React, { useEffect, useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import AdminDet from '../../../Components/AdminComponents/AdminDet/AdminDet';
import { useParams } from 'react-router-dom';
import adminInstance from '../../../instance/AdminInstance';




const SuperAdminDetails = () => {

  const { superadminId } = useParams()
  const [SuperAdminData, SetSuperAdminData] = useState("")

  useEffect(() => {
    try {
      adminInstance.get(`/api/super_admin/get_profile?adminId=${superadminId}`).then((response) => {
        SetSuperAdminData(response.data)
      })
    } catch (error) {
      console.log(error);
    }
  },[superadminId])

  return (
    <div className={Style.single}>
      <Sidebar />
      <div className={Style.singleContainer}>
        <Header />
        <div className={Style.top}>
          <AdminDet Admin={SuperAdminData} />
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDetails