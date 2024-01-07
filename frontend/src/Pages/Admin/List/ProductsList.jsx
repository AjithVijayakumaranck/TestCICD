import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DataTable from '../../../Components/AdminComponents/DataTable/DataTable'
import instance from '../../../instance/AxiosInstance';
import adminInstance from '../../../instance/AdminInstance';



const ProductsList = () => {


  const navigate = useNavigate();

  const columns = [

    {
      name: 'ID',
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: 'Price',
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: 'Options',
      cell: (row) => (
        <div className={Style.optionsContainer}>
          <button className={Style.viewButton} onClick={() => navigate(`/admin/products/singles/${row._id}`)}  > View </button>
          <button className={Style.deleteButton} onClick={() => handleDelete(row._id)} > Block </button>
        </div>
      ),
      width: '160px'
    },

  ];



  const [Products, SetProducts] = useState([]);

  const loadProducts = () => {
    try {
      adminInstance.get("/api/super_admin/product_control/get_products").then((response) => {
        SetProducts([...response.data]);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //LoadCategory functions
  useEffect(() => {
    loadProducts();
  }, []);


  //Handle Delete function
  const handleDelete = (itemId) => {
    try {
      adminInstance.delete(`/api/super_admin/product_control/delete_product/${itemId}`).then((Response) => {
        loadProducts();
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
        <DataTable Row={Products} Columns={columns} ActionColumn="" Title="Products" Path="Products" />
      </div>

    </div>
  )
}

export default ProductsList