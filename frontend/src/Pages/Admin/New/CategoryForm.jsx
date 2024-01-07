import React, { useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header';
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import adminInstance from '../../../instance/AdminInstance';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';



const New = ({ title }) => {

  const navigate = useNavigate()
  const [CategoryData, SetCategoryData] = useState("");
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


  const HandleSubmit = (e) => {
    e.preventDefault();
    if (CategoryData !== "") {
      let data = new FormData()

      data.append("file", File.File)
      data.append("category", CategoryData)

      adminInstance.post("/api/super_admin/category/add_category", data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then((Response) => {
        toast.success("Sucessfully Created")
        navigate('/admin/category')
        // Reset the form
        SetCategoryData("");
        SetFile({
          File: "",
          FileUrl: "",
          Caption: ""
        })
      }).catch((err) => {
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
                  value={CategoryData}
                  onChange={(e) => SetCategoryData(e.target.value)} />
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

export default New;