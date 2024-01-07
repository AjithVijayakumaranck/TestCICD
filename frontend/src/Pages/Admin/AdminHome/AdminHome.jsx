import React, { useContext, useEffect } from 'react'
import Style from './Style.module.css'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import Header from '../../../Components/AdminComponents/Header/Header'
import Widgets from '../../../Components/AdminComponents/Widgets/Widgets'
import Charts from '../../../Components/AdminComponents/Charts/Charts'
import Featured from '../../../Components/AdminComponents/Featured/Featured'
import Table from '../../../Components/AdminComponents/Table/List'
import { useState } from 'react'
import adminInstance from '../../../instance/AdminInstance'
import { AdminContext } from '../../../Contexts/AdminContext'


const AdminHome = () => {

  const LoggedInAdmin = useContext(AdminContext);
  const { Admin, SetAdmin } = LoggedInAdmin

  const [Products, SetProducts] = useState([]);
  const [LatestProducts, SetLatestProducts] = useState([]);

  const loadProducts = () => {
    try {
      adminInstance.get("/api/super_admin/product_control/get_products").then((response) => {
        SetProducts([...response.data]);
        SetLatestProducts([...response.data?.slice(-5)])
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
  }, [Admin]);




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

        <div className={Style.listContainer}>
          <div className={Style.listTitle}> Latest Products </div>
          <Table rows={LatestProducts} />
        </div>

        <div className={Style.charts}>
          <Featured />
          <Charts />
        </div>

      </div>
    </div>
  )
}

export default AdminHome