import React, { useContext } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import { AdminContext } from '../../../Contexts/AdminContext';
import AdminDet from '../../../Components/AdminComponents/AdminDet/AdminDet'





const ProfileDetails = () => {

  const LoggedInAdmin = useContext(AdminContext);
  const { Admin, SetAdmin } = LoggedInAdmin

  return (
    <div className={Style.single}>
      <Sidebar />
      <div className={Style.singleContainer}>
        <Header />
        <div className={Style.top}>
          <AdminDet Admin={Admin} />
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails