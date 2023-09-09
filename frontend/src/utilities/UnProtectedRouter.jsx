import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const UnProtectedRouter = () => {

    const isUserAuthenticated = !!localStorage.getItem('token');
    const isAdminAuthenticated = !!localStorage.getItem('AdminToken');

    return (
        isUserAuthenticated ? <Navigate to="/" />
            : isAdminAuthenticated ? <Navigate to="/admin" />
                : <Outlet />
    )
}

export default UnProtectedRouter