import React, { useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header'
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import adminInstance from '../../../instance/AdminInstance';


const EditForm = ({ title }) => {

    const [file, setFile] = useState("");
    const [Name, SetName] = useState("");
    const [Email, SetEmail] = useState("");
    const [Phone, SetPhone] = useState("");
    const [Address, SetAddress] = useState("");
    const [Country, SetCountry] = useState("");

    const formData = { Name, Email, Phone, Address, Country }

    const handleSubmit = (e) => {
        e.preventDefault()
        adminInstance.post("", formData).then((Response) => {
            console.log(("Nothing"));
        }).catch((err) => {
            console.log(err);
        })
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
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className={Style.right}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className={Style.formInput}>
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>


                            <div className={Style.formInput}>
                                <label>Name</label>
                                <input type="text"
                                    placeholder="name"
                                    name="name"
                                    onChange={(e) => { SetName(e.target.value) }}
                                />
                            </div>
                            <div className={Style.formInput}>
                                <label>Email</label>
                                <input type="text"
                                    placeholder="email"
                                    name="email"
                                    onChange={(e) => { SetEmail(e.target.value) }}
                                />
                            </div>
                            <div className={Style.formInput}>
                                <label>Phone No</label>
                                <input type="text"
                                    placeholder="phonenumber"
                                    name="phonenumber"
                                    onChange={(e) => { SetPhone(e.target.value) }}
                                />
                            </div>
                            <div className={Style.formInput}>
                                <label>Address</label>
                                <input type="text"
                                    placeholder="address"
                                    name="address"
                                    onChange={(e) => { SetAddress(e.target.value) }}
                                />
                            </div>
                            <div className={Style.formInput}>
                                <label>Country</label>
                                <input type="text"
                                    placeholder="country"
                                    name="country"
                                    onChange={(e) => { SetCountry(e.target.value) }}
                                />
                            </div>

                            <div className={Style.formBtn}>
                                <button>Save</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditForm