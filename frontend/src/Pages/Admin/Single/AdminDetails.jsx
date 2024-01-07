import React, { useEffect, useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import AdminDet from '../../../Components/AdminComponents/AdminDet/AdminDet';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import adminInstance from '../../../instance/AdminInstance';




const AdminDetails = () => {

  const { adminId } = useParams()
  const [AdminData, SetAdminData] = useState("")

  useEffect(() => {
    try {
      adminInstance.get(`/api/super_admin/get_profile?adminId=${adminId}`).then((response) => {
        SetAdminData(response.data)
      })
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong")
    }
  },[adminId])

  return (
    <div className={Style.single}>
      <Sidebar />
      <div className={Style.singleContainer}>
        <Header />
        <div className={Style.top}>
          <AdminDet Admin={AdminData} />
        </div>
      </div>
    </div>
  );
}

export default AdminDetails