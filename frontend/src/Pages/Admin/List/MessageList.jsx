import React, { useEffect, useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DataTable from '../../../Components/AdminComponents/DataTable/DataTable'
import { useNavigate } from 'react-router-dom'
import instance from '../../../instance/AxiosInstance'
import { toast } from 'react-toastify'
import adminInstance from '../../../instance/AdminInstance'


const MessageList = () => {

  const navigate = useNavigate();
  const [Messages, SetMessages] = useState([])

  const LoadMessage = () => {
    try {
      adminInstance.get('/api/super_admin/feedback_control/get_feedbacks').then((response) => {
        SetMessages(response.data);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    LoadMessage()
  }, [])


  const columns = [

    {
      name: 'Name',
      selector: (row) => row.name,
      sortable: true,
      width: '180px'
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
      width: '180px'
    },
    {
      name: 'Message',
      selector: (row) => row.message,
      sortable: true,
      width: '500px',
    },

    {
      name: 'Option',
      cell: (row) => (
        <div className={Style.optionsContainer}>
          {/* <button className={Style.viewButton} onClick={() => navigate(`/admin/messages/singles/${row._id}`)} >View</button> */}
          <button className={Style.deleteButton} onClick={() => HandleRead(row._id)} > Mark Read </button>
        </div>
      ),
    }

  ];


  const HandleRead = (Id) => {
    try {
      adminInstance.put(`/api/super_admin/feedback_control/mark_as_read/${Id}`).then((response) => {
        toast.success('Mark As Readed')
        LoadMessage();
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={Style.list} >
      <Sidebar />
      <div className={Style.listContainer} >
        <Header />
        <DataTable Row={Messages} Columns={columns} ActionColumn="" Title="Messages" Link="" Path="" />
      </div>

    </div>
  )
}

export default MessageList