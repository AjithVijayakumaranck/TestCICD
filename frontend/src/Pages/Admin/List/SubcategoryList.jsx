import React, { useState, useEffect } from "react"
import instance from "../../../instance/AxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DataTable from '../../../Components/AdminComponents/DataTable/DataTable'
import adminInstance from "../../../instance/AdminInstance";



const SubcategoryList = () => {

  const [SubCategories, SetSubCategories] = useState([]);
  const navigate = useNavigate();

  const columns = [

    {
      name: 'ID',
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: 'SubcategoryName',
      selector: (row) => row.subcategory,
      sortable: true,
    },

    {
      name: 'Options',
      cell: (row) => (
        <div className={Style.optionsContainer}>
          {/* <button className={Style.viewButton} onClick={() => navigate(`/admin/subcategory/singles/${row._id}`)} >View</button> */}
          <button className={Style.editButton} onClick={() => navigate(`/admin/subcategory/edit/${row._id}`)} >Edit</button>
          <button className={Style.deleteButton} onClick={() => handleDelete(row._id, row.category)} > Block </button>
        </div>
      ),
      width: '200px'
    },

  ];


  const handleDelete = (itemId, categoryId) => {
    try {
      adminInstance.delete(`/api/super_admin/category/delete_subcategory?subcategoryId=${itemId}&&categoryId=${categoryId}`).then((Response) => {
        loadcategory();
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const loadcategory = () => {
    try {
      adminInstance.get("/api/super_admin/category/get_subcategory").then((response) => {
        SetSubCategories([...response.data]);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //LoadCategory functions
  useEffect(() => {
    loadcategory();
  }, []);

  return (
    <div className={Style.list} >
      <Sidebar />
      <div className={Style.listContainer} >
        <Header />
        <DataTable Row={SubCategories} Columns={columns} ActionColumn="" Title="SubCategories" Links="Add New SubCategory" Path="subcategory" />
      </div>

    </div>
  )
}

export default SubcategoryList