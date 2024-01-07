import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DataTable from '../../../Components/AdminComponents/DataTable/DataTable'
import adminInstance from '../../../instance/AdminInstance';






const UsersList = () => {


  const navigate = useNavigate();

  const columns = [

    {
      name: 'ID',
      selector: (row) => row._id,
      sortable: true,
      width:'250px'
    },
    {
      name: 'Full Name',
      selector: (row) => `${row.fullname || ''} ${row.surname || ''}`,
      sortable: true,
    },
    {
      name: 'Options',
      cell: (row) => (
        <div className={Style.optionsContainer}>
          <button className={Style.viewButton} onClick={() => navigate(`/admin/users/singles/${row._id}`)}  > View </button>
          <button className={Style.deleteButton} onClick={() => handleDelete(row._id)} > Block </button>
        </div>
      ),
      width: '160px'
    },

  ];



  const [Users, SetUsers] = useState([]);

  const loadUsers = () => {
    try {
      adminInstance.get("/api/super_admin/user_control/get_allprofile").then((response) => {
        SetUsers([...response.data]);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //LoadCategory functions
  useEffect(() => {
    loadUsers();
  }, []);


  //Handle Delete function
  const handleDelete = (itemId) => {
    try {
      adminInstance.delete(`/api/super_admin/user_control/deleteProfile/${itemId}`).then((Response) => {
        loadUsers();
      }).catch((err) => {
        console.log(err);
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
        <DataTable Row={Users} Columns={columns} ActionColumn="" Title="Users" Path="users" />
      </div>

    </div>
  )
}

export default UsersList