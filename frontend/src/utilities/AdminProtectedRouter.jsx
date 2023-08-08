import React from 'react'
import { Outlet,Navigate } from 'react-router-dom';

const AdminProtectedRouter =  () => {
    let auth =  localStorage.getItem('AdminToken')
    
  return (
      auth ? <Outlet/> : <Navigate to='/admin'/>
    )
}

export default AdminProtectedRouter