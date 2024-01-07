import React, { useState, useEffect } from "react"
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DataTable from '../../../Components/AdminComponents/DataTable/DataTable'
import adminInstance from "../../../instance/AdminInstance";



const AdsLists = () => {


  const [Carousel, SetCarousel] = useState([]);


  const columns = [

    {
      name: 'Image',
      cell: (row) => <img width={100} height={50} src={row.image.url} alt="" className={Style.SquareImage} />,
      width:'150px',
    },
    {
      name: 'ID',
      selector: (row) => row._id,
      sortable: true,
      //width: '250px'
    },
    {
      name: 'Options',
      cell: (row) => (
        <div className={Style.optionsContainer}>
          {/* <button className={Style.viewButton} onClick={() => navigate(`/admin/ads/singles/${row._id}`)} >View</button> */}
          <button className={Style.editButton} onClick={() => HandleToggle(row._id, row.active)} >{row.active ? 'Make InActive' : 'Make Active'}</button>
          <button className={Style.deleteButton} onClick={() => handleDelete(row._id, row.category)} > Block </button>
        </div>
      ),
      width: '250px'
    },
  ];


  const handleDelete = (itemId) => {
    try {
      adminInstance.delete(`/api/super_admin/carousal_control/delete_carousal?carousalId=${itemId}`).then((Response) => {
        loadCarousel();
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const HandleToggle = (Id,Status) => {
    try {
      adminInstance.put(`/api/super_admin/carousal_control/toggle_active?carousalId=${Id}&&status=${!Status}`).then((Response) => {
        loadCarousel();
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {   
      console.log(error);
    }
  }


  const loadCarousel = () => {
    try {
      adminInstance.get("/api/super_admin/carousal_control/get_carousal").then((response) => {
        SetCarousel([...response.data]);
      }).catch((error) => {
        console.log(error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //LoadCategory functions
  useEffect(() => {
    loadCarousel();
  }, []);


  return (
    <div className={Style.list} >
      <Sidebar />
      <div className={Style.listContainer} >
        <Header />
        <DataTable Row={Carousel} Columns={columns} ActionColumn="" Title="Advertisements" Links="Add New Ads" Path="ads" />
      </div>
    </div>
  )
}

export default AdsLists