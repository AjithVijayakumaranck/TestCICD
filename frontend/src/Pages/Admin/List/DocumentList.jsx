import React, { useState, useEffect } from "react"
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DataTable from '../../../Components/AdminComponents/DataTable/DataTable'
import { useNavigate } from "react-router-dom";
import adminInstance from "../../../instance/AdminInstance";



const DocumentList = () => {

  const navigate = useNavigate();

  const [Documents, SetDocuments] = useState([]);

  const columns = [


    {
      name: 'ID',
      selector: (row) => row._id,
      sortable: true,
      width: '250px'
    },
    {
      name: 'Document Name',
      selector: (row) => row.name,
      sortable: true,
    },
  ];

  const loadDocuments = () => {
    try {
      adminInstance.get("/api/super_admin/terms/get_term").then((response) => {
        SetDocuments([...response.data]);
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Load Documents functions
  useEffect(() => {
    loadDocuments();
  }, []);


  return (
    <div className={Style.list} >
      <Sidebar />
      <div className={Style.listContainer} >
        <Header />
        <DataTable Row={Documents} Columns={columns} ActionColumn="" Title="Documents" Links="Add New Document" Path="document" />
      </div>
    </div>
  )
}

export default DocumentList