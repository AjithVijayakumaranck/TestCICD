import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import instance from '../../../instance/AxiosInstance';
import DataTable from '../../../Components/AdminComponents/DataTable/DataTable'
import { AdminContext } from '../../../Contexts/AdminContext';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'
import adminInstance from '../../../instance/AdminInstance';



const AdminList = () => {


  const navigate = useNavigate();

  const LoggedInAdmin = useContext(AdminContext);
  const { Admin, SetAdmin } = LoggedInAdmin

  const [AdminData, SetAdminData] = useState([]);

  const columns = [

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
      name: 'Options',
      cell: (row) => (
        <div className={Style.optionsContainer}>
          <button className={Style.viewButton} onClick={() => navigate(`/admin/members/single/${row._id}`)}  > View </button>
          <button className={Style.editButton} onClick={() => HandleRoleChange(row._id)} >Make SuperAdmin</button>
          <button className={Style.viewButton} onClick={() => navigate(`/admin/members/updatepassword/${row._id}`)}  > Edit Password </button>
          {/* <button className={Style.deleteButton} onClick={() => handleDelete(row._id)} > Block </button> */}
        </div>
      ),
      width: '400px'
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
            password: password, adminId: ItemId, role: "superadmin"
          }).then((response) => {
            toast.success("Updated Sucessfully")
            loadAdmins();
          })
        } catch (error) {
          console.log(error);
        }
      }
    })
  }

  const loadAdmins = () => {
    try {
      adminInstance.get("/api/super_admin/get_admins").then((response) => {
        SetAdminData([...response.data]);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //LoadCategory functions
  useEffect(() => {
    loadAdmins();
  }, []);


  



  return (
    <div className={Style.list} >
      <Sidebar />
      <div className={Style.listContainer} >
        <Header />
        <DataTable Row={AdminData} Columns={columns} ActionColumn="" Title="Admins" Links="Add New Admin" Path="members" />
      </div>

    </div>
  )
}

export default AdminList