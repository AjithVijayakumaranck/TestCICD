import React, { useState, useEffect } from "react"
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DataTable from '../../../Components/AdminComponents/DataTable/DataTable'
import { useNavigate } from "react-router-dom";
import adminInstance from "../../../instance/AdminInstance";



const CategoryList = () => {

  const navigate = useNavigate();

  const columns = [

    {
      name: 'Image',
      cell: (row) => <img width={50} height={50} src={row.icon.url} alt="" className={Style.RoundedImage} />,
    },
    {
      name: 'CategoryName',
      selector: (row) => row.categoryName,
      sortable: true,
    },
    {
      name: 'Options',
      cell: (row) => (
        <div className={Style.optionsContainer}>
          <button className={Style.viewButton} onClick={() => navigate(`/admin/category/add-filter/${row._id}`)}> Add Filter </button>
          <button className={Style.viewButton} onClick={() => navigate(`/admin/category/edit/${row._id}`)}> Edit </button>
          <button className={Style.deleteButton} onClick={() => handleDelete(row._id)}> Block </button>
        </div>
      ),
      width: '300px'
    },
  ];


  const handleDelete = (itemId) => {
    try {
      adminInstance.delete(`/api/super_admin/category/delete_category?categoryid=${itemId}`).then((Response) => {
        loadcategory();
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  };


  const [categories, setCategories] = useState([]);

  const loadcategory = () => {
    try {
      adminInstance.get("/api/super_admin/category/get_categories").then((response) => {
        setCategories([...response.data]);
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
        <DataTable Row={categories} Columns={columns} ActionColumn="" Title="Categories" Links="Add New Category" Path="category" />
      </div>
    </div>
  )
}

export default CategoryList