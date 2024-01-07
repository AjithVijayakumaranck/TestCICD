import React, { useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DataTable from '../../../Components/AdminComponents/DataTable/DataTable'
import { useNavigate } from 'react-router-dom'
import instance from '../../../instance/AxiosInstance'
import { useEffect } from 'react'
import adminInstance from '../../../instance/AdminInstance'


const NotificationList = () => {

  
  const [Notification, SetNotification] = useState([])

  const LoadNotification = () => {
    try {
      adminInstance.get(`/api/super_admin/notification_control/get_notification`).then((response) => {
        SetNotification(response.data);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    LoadNotification()
  }, [])

  const columns = [
    {
      name: 'Message',
      selector: (row) => row.notification,
      sortable: true,
    },

  ];

 

  return (
    <div className={Style.list} >
      <Sidebar />
      <div className={Style.listContainer} >
        <Header />
        <DataTable Row={Notification} Columns={columns} ActionColumn="" Title="Notifications" Links="Add New Notification" Path="notifications" />
      </div>

    </div>
  )
}

export default NotificationList