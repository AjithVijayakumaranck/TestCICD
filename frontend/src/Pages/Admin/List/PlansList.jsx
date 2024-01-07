import React, { useState, useEffect } from "react"
import instance from "../../../instance/AxiosInstance";
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DataTable from '../../../Components/AdminComponents/DataTable/DataTable'
import { useNavigate } from "react-router-dom";
import adminInstance from "../../../instance/AdminInstance";



const PlansList = () => {

  const navigate = useNavigate();

  const [Plans, SetPlans] = useState([]);

  const columns = [
    {
      name: 'Plan Name',
      selector: (row) => row.plan_name,
      sortable: true,
      //width: '160px'
    },
    {
      name: 'Duration',
      selector: (row) => row.plan_duration,
      sortable: true,
      width: '140px'
    },
    {
      name: 'Discount',
      selector: (row) => row.discount,
      sortable: true,
      width: '140px'
    },
    {
      name: 'Monthly Pricing',
      selector: (row) => row.monthly_pricing,
      sortable: true,
      width: '180px'
    },
    {
      name: 'Options',
      cell: (row) => (
        <div className={Style.optionsContainer}>
          <button className={Style.viewButton} onClick={() => navigate(`/admin/plans/single/${row._id}`)} >View</button> 
          <button className={Style.editButton} onClick={() => navigate(`/admin/plans/edit/${row._id}`)}>Edit</button>
          <button className={Style.deleteButton} onClick={() => handleDelete(row._id)}>Block</button>
        </div>
      ),
      width: '200px'
    },
    

  ];


  const handleDelete = (itemId) => {
    try {
      adminInstance.delete(`/api/super_admin/category/delete_category?categoryid=${itemId}`).then((Response) => {
        loadPlans();
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  };


  

  const loadPlans = () => {
    try {
      adminInstance.get("/api/super_admin/subscription_control/get_subscription").then((response) => {
        SetPlans([...response.data]);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //LoadCategory functions
  useEffect(() => {
    loadPlans();
  }, []);


  return (
    <div className={Style.list} >
      <Sidebar />
      <div className={Style.listContainer} >
        <Header />
        <DataTable Row={Plans} Columns={columns} ActionColumn="" Title="Subscribe Plan" Links="Add New Plans" Path="plans" />
      </div>
    </div>
  )
}

export default PlansList