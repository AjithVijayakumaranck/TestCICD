import React from 'react'
import Style from "./index.module.css";
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import AdvertisementForm from './AdvertisementForm/AdvertisementForm';


const Advertisement = () => {

    const Navigate = useNavigate()
  return (
    <div className={Style.page_wrapper}>
    <   div className={Style.header_wrapper}>
        <div className={Style.backarrow} onClick={() => Navigate('/')} >
            <BiArrowBack />
        </div>
    </div>
        <div className={Style.under_heading}>
           <div>
           <h1>Add your advertisement </h1> 
            <h5>post your advertisement in your desired size</h5>
        
           </div>
        </div>
        <div className={Style.form_space}>
            <AdvertisementForm/>
        </div>
</div>
  )
}

export default Advertisement