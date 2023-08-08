import React, { useEffect } from 'react'
import Style from './Style.module.css'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import Header from '../../../Components/AdminComponents/Header/Header'
import Widgets from '../../../Components/AdminComponents/Widgets/Widgets'
import Charts from '../../../Components/AdminComponents/Charts/Charts'
import Featured from '../../../Components/AdminComponents/Featured/Featured'
import Table from '../../../Components/AdminComponents/Table/List'
import { useState } from 'react'
import instance from '../../../instance/AxiosInstance'
import adminInstance from '../../../instance/AdminInstance'


const AdminHome = () => {

  const [Products, SetProducts] = useState([]);

  const loadProducts = () => {
    try {
      adminInstance.get("/api/super_admin/product_control/get_products").then((response) => {
        //console.log(response.data);
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

  const LatestProducts = Products.slice(-5)

  return (
    <div className={Style.home}>
      <Sidebar />
      <div className={Style.homeContainer}>
        <Header />
        <div className={Style.widgets}>
          <Widgets type="user" />
          <Widgets type="product" />
          <Widgets type="category" />
          <Widgets type="earning" />
        </div>
        <div className={Style.charts}>
          <Featured />
          <Charts />
        </div>
        <div className={Style.listContainer}>
          <div className={Style.listTitle}> Latest Products </div>
          <Table rows={LatestProducts} />
        </div>

      </div>
    </div>
  )
}

export default AdminHome