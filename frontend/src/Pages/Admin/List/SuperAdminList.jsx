import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DataTable from '../../../Components/AdminComponents/DataTable/DataTable'
import { AdminContext } from '../../../Contexts/AdminContext';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import adminInstance from '../../../instance/AdminInstance';





const SuperAdminList = () => {


  const navigate = useNavigate();
  const LoggedInAdmin = useContext(AdminContext);
  const { Admin, SetAdmin } = LoggedInAdmin

  const [SuperAdmins, SetSuperAdmins] = useState([]);

  const columns = [

    {
      name: 'ID',
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: 'Full Name',
      selector: (row) => `${row.fullname || ''} ${row.surname || ''}`,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Phone Number',
      selector: (row) => row.phoneNumber,
      sortable: true,
    },
    {
      name: 'Options',
      cell: (row) => (
        <div className={Style.optionsContainer}>
          <button className={Style.viewButton} onClick={() => navigate(`/admin/superadmins/single/${row._id}`)}  > View </button>
          <button className={Style.editButton} onClick={() => HandleRoleChange(row._id)} >Make Admin</button>
          <button className={Style.viewButton} onClick={() => navigate(`/admin/superadmins/updatepassword/${row._id}`)}  > Edit Password </button>
        </div>
      ),
      width: '300px'
    },

  ];


  const HandleRoleChange = (ItemId) => {
    const { value: password } = Swal.fire({
      title: 'Enter your password',
      input: 'password',
      inputLabel: 'Password',
      inputPlaceholder: 'Enter your password',
      inputAttributes: {
        maxlength: 10,
        autocapitalize: 'off',
        autocorrect: 'off'
      },
      showCancelButton: true,
      confirmButtonColor: '#046BD2',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (!result.dismiss && result.value) {
        const password = result.value;
        try {
          adminInstance.put("/api/super_admin/upgrade_role", {
            superAdminId: Admin._id,
            password: password, adminId: ItemId, role: "admin"
          }).then((response) => {
    
            toast.success("Updated Sucessfully")
            loadSuperAdmins();
          })
        } catch (error) {
          console.log(error);
        }
      }
    })
  }


  const loadSuperAdmins = () => {
    try {
      adminInstance.get("/api/super_admin/get_superadmins").then((response) => {
     
        SetSuperAdmins([...response.data]);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //LoadCategory functions
  useEffect(() => {
    loadSuperAdmins();
  }, []);


  






  return (
    <div className={Style.list} >
      <Sidebar />
      <div className={Style.listContainer} >
        <Header />
        <DataTable Row={SuperAdmins} Columns={columns} ActionColumn="" Title="SuperAdmins" Path="superadmins" />
      </div>

    </div>
  )
}

export default SuperAdminList