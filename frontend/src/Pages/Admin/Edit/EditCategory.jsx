import React, { useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header';
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import instance from "../../../instance/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import adminInstance from '../../../instance/AdminInstance';


const EditCategory = ({ title }) => {

  const { categoryId } = useParams()

  const navigate = useNavigate();

  const [CategoryDet, SetCategoryDet] = useState("");
  //const [GetCategory, SetGetCategory] = useState("");
  const [File, SetFile] = useState({
    File: "",
    FileUrl: "",
    Caption: ""
  });

  const uploadFile = (e) => {

    SetFile({
      ...File, FileUrl: URL.createObjectURL(e.target.files[0]),
      File: e.target.files[0]
    });
  }

  useEffect(() => {
    try {
      adminInstance.get(`/api/super_admin/category/get_singlecategory?categoryId=${categoryId}`).then((res) => {
        SetCategoryDet(res.data)

      })
    } catch (error) {
      console.log(error);
    }
  }, [])

  const HandleSubmit = (e) => {
    e.preventDefault();


    if (CategoryDet !== "") {

      let data = new FormData()
      data.append("file", File.File)
      data.append("CategoryDet", CategoryDet)
      data.append("categoryId", categoryId)

      console.log(data,"form data");

      adminInstance.put("/api/super_admin/category/update_category", data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((Response) => {

        toast.success("Sucessfully Updated")
        navigate('/admin/category')
      }).catch((err) => {
        console.log('Error creating category:', err);
        toast.error("Something Went Wrong")
      })
    } else {
      toast.error("This field cannot be empty")
    }
  }

  return (
    <div className={Style.new}>
      <Sidebar />
      <div className={Style.newContainer}>
        <Header />
        <div className={Style.top}>
          <h1>{title}</h1>
        </div>
        <div className={Style.bottom}>
          <div className={Style.left}>
            <img
              src={
                File.FileUrl
                  ? File.FileUrl
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className={Style.right}>
            <form onSubmit={(e) => { HandleSubmit(e) }}>
              <div className={Style.formInput}>
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={uploadFile}
                  style={{ display: "none" }}
                />
              </div>

              <div className={Style.formInput}>
                <label>Category Name</label>
                <input type="text"
                  placeholder="Category name"
                  name='categoryname'
                  id='categoryname'
                  value={CategoryDet.categoryName}
                  onChange={(e) => SetCategoryDet(e.target.value)} />
              </div>

              <div className={Style.formBtn}>
                <button>Save</button>
                <button onClick={() => { navigate('/admin/category') }}>Cancel</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;