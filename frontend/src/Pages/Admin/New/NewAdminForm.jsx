import React, { useState } from 'react'
import Style from './Style.module.css'
import Header from '../../../Components/AdminComponents/Header/Header';
import Sidebar from '../../../Components/AdminComponents/Sidebar/Sidebar'
import instance from "../../../instance/AxiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import adminInstance from '../../../instance/AdminInstance';



const NewAdminForm = ({ title }) => {

  const Navigate = useNavigate();

  const [Error, SetError] = useState({});
  const [AdminDetail, SetAdminDetail] = useState({
    fullname: "",
    surname: "",
    email: "",
    password: "",
    confirmpassword: "",
    locality: "",
    district: "",
    state: "",
    region: "",
    role: ""
  })

  // -------------validation---------------

  const validateForm = () => {

    let newErrors = {};

    if (AdminDetail.fullname === '') {
      newErrors.fullname = 'Fullname is required';
    }
    if (AdminDetail.surname === '') {
      newErrors.surname = 'Surname is required';
    }
    if (AdminDetail.email === '') {
      newErrors.email = 'Surname is required';
    }
    if (AdminDetail.locality === '') {
      newErrors.locality = 'Locality is required';
    }
    if (AdminDetail.state === '') {
      newErrors.state = 'State is required';
    }
    if (AdminDetail.district === '') {
      newErrors.district = 'District is required';
    }
    if (AdminDetail.region === '') {
      newErrors.region = 'Region is required';
    }
    if (AdminDetail.role === '') {
      newErrors.role = 'Role is required';
    }

    SetError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //validation handlers
  const passwordValidation = (e) => {
    if (e.target.value === "") {
      SetError({ ...Error, password: "This field cannot be empty" })
    } else {
      if (e.target.value.toString().length < 8) {
        SetError({ ...Error, password: "password must need atleast 8 characters" })
      } else {
        SetError({ ...Error, password: "" })
        SetAdminDetail({ ...AdminDetail, password: e.target.value })
      }
    }
  }

  const confirmValidation = (e) => {
    if (e.target.value === "") {
      SetError({ ...Error, confirmpassword: "This field cannot be empty" })
    } else {
      if (e.target.value !== AdminDetail.password) {
        SetError({ ...Error, confirmpassword: "entered password is not similar" })
      } else {
        SetError({ ...Error, confirmpassword: "" })
        SetAdminDetail({ ...AdminDetail, confirmpassword: e.target.value })
      }
    }
  }

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      adminInstance.post('/api/super_admin/admin_create',
        {
          fullName: AdminDetail.fullname, surName: AdminDetail.surname, email: AdminDetail.email,
          password: AdminDetail.confirmpassword, locality: AdminDetail.locality, district: AdminDetail.district,
          state: AdminDetail.state, region: AdminDetail.region, role: AdminDetail.role
        }).then((response) => {
          toast.success("Sucessfully Created")
          Navigate('/admin/members')
        }).catch((err) => {
          console.log(err);
        })
    } else {
      toast.error("Something Went Wrong")
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

        <div className={Style.center}>
          <div className={Style.right}>

            <form onSubmit={(e) => HandleSubmit(e)}>

              <div className={Style.formInput}>
                <label>First Name <span>*</span> </label>
                <input type="text"
                  placeholder="name"
                  id='planName'
                  value={AdminDetail.fullname}
                  onChange={(e) => { SetAdminDetail({ ...AdminDetail, fullname: e.target.value }) }}
                />
                <p>{Error.fullname}</p>
              </div>

              <div className={Style.formInput}>
                <label>Last Name <span>*</span> </label>
                <input type="text"
                  placeholder="lastname"
                  id='lastname'
                  value={AdminDetail.surname}
                  onChange={(e) => { SetAdminDetail({ ...AdminDetail, surname: e.target.value }) }}
                />
                <p>{Error.surname}</p>
              </div>

              <div className={Style.formInput}>
                <label>Email <span>*</span> </label>
                <input type="email"
                  placeholder="email"
                  id='email'
                  value={AdminDetail.email}
                  onChange={(e) => { SetAdminDetail({ ...AdminDetail, email: e.target.value }) }}
                />
                <p>{Error.email}</p>
              </div>

              <div className={Style.formInput}>
                <label>Locality <span>*</span> </label>
                <input type="text"
                  placeholder="locality"
                  id='locality'
                  value={AdminDetail.locality}
                  onChange={(e) => { SetAdminDetail({ ...AdminDetail, locality: e.target.value }) }}
                />
                <p>{Error.locality}</p>
              </div>

              <div className={Style.formInput}>
                <label>District <span>*</span> </label>
                <input type="text"
                  placeholder="district"
                  id='district'
                  value={AdminDetail.district}
                  onChange={(e) => { SetAdminDetail({ ...AdminDetail, district: e.target.value }) }}
                />
                <p>{Error.district}</p>
              </div>

              <div className={Style.formInput}>
                <label>State <span>*</span> </label>
                <input type="text"
                  placeholder="state"
                  id='state'
                  value={AdminDetail.state}
                  onChange={(e) => { SetAdminDetail({ ...AdminDetail, state: e.target.value }) }}
                />
                <p>{Error.state}</p>
              </div>

              <div className={Style.formInput}>
                <label>Region <span>*</span> </label>
                <input type="text"
                  placeholder="region"
                  id='region'
                  value={AdminDetail.region}
                  onChange={(e) => { SetAdminDetail({ ...AdminDetail, region: e.target.value }) }}
                />
                <p>{Error.region}</p>
              </div>

              <div className={Style.formInput}>
                <label>Role <span>*</span> </label>
                <select name="role" onChange={(e) => { SetAdminDetail({ ...AdminDetail, role: e.target.value }) }} required >
                  <option value="" selected disabled hidden>Choose here</option>
                  <option value="admin" >Admin</option>
                  <option value="superadmin" >Super Admin</option>
                </select>
                <p>{Error.role}</p>
              </div>

              <div className={Style.formInput}>
                <label>Password <span>*</span> </label>
                <input type="password"
                  placeholder="password"
                  id='password'
                  onChange={(e) => passwordValidation(e)}

                />
                <p>{Error.password}</p>
              </div>

              <div className={Style.formInput}>
                <label>Confirm Password <span>*</span> </label>
                <input type="password"
                  placeholder="confirm Password"
                  id='confirmpassword'
                  onChange={(e) => confirmValidation(e)}

                />
                <p>{Error.confirmpassword}</p>
              </div>

              <div className={Style.formBtn}>
                <button>Save</button>
                <button onClick={() => { Navigate('/admin/members') }}>Cancel</button>
              </div>

            </form>
          </div>
        </div>

      </div >
    </div >
  )
};

export default NewAdminForm;