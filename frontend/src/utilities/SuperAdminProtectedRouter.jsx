import React from 'react'
import { Outlet,Navigate } from 'react-router-dom';
import { AdminContext } from '../Contexts/AdminContext';
import { useContext } from 'react';

const SuperAdminProtectedRouter =  () => {

   
    const LoggedInAdmin = useContext(AdminContext);
    const { Admin } = LoggedInAdmin

    let auth = Admin.role === "superadmin" ? localStorage.getItem('AdminToken') : null
    //console.log(Admin, "admin details 22");
    //console.log(auth ,"prorected router");

  return (
      auth ? <Outlet/> : <Navigate to='/registration_login'/>
    )
}

export default SuperAdminProtectedRouter