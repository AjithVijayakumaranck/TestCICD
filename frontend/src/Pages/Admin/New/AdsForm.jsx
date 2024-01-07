import React, { useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header';
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import adminInstance from '../../../instance/AdminInstance';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';



const AdsForm = ({ title }) => {

  const navigate = useNavigate()
  const [File, SetFile] = useState({
    File: "",
    FileUrl: "",
    Caption: ""
  });

  const uploadFile = (e) => {
    if (e.target.files !== null) {
      SetFile({
        ...File, FileUrl: URL.createObjectURL(e.target.files[0]),
        File: e.target.files[0]
      });
    }
  }


  const HandleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData()
    data.append("file", File.File)

    adminInstance.post("/api/super_admin/carousal_control/upload_carousal", data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((Response) => {
      toast.success("Sucessfully Created")
      navigate('/admin/ads')
      SetFile({
        File: "",
        FileUrl: "",
        Caption: ""
      })
    }).catch((err) => {
      toast.error("Something Went Wrong")
    })
  }

  const HandleCancel = (e) => {
    e.preventDefault()
    SetFile({
      File: "",
      FileUrl: "",
      Caption: ""
    })
    navigate('/admin/ads')
  }



  return (
    <div className={Style.new}>
      <Sidebar />
      <div className={Style.newContainer}>
        <Header />
        <div className={Style.top}>
          <h1>{title}</h1>
        </div>
        <div className={Style.bottomTable}>
          <div className={Style.leftItem}>
            <img
              src={
                File.FileUrl
                  ? File.FileUrl
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
              className={Style.SquareImg}
            />
          </div>
          <div className={Style.right}>
            <form onSubmit={(e) => { HandleSubmit(e) }}>
              <div className={Style.formItem}>
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

              <div className={Style.formBtn}>
                <button>Save</button>
                <button onClick={(e) => HandleCancel(e)}>Cancel</button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsForm;