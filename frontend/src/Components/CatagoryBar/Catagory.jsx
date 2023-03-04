import React from 'react'
import { BsFillCaretDownFill } from 'react-icons/bs'
import { HiChevronDown } from "react-icons/hi2";
import Style from './index.module.css'

const Catagory = () => {
  return (
    <div className={Style.Container}>
     <div><h4>All Category</h4><HiChevronDown/></div>
     <div>
        <ul>
            <li>Cars</li>
            <li>Electronics</li>
            <li>Motorcycles</li>
            <li>For Sale : Houses And Appartments</li>
            <li>Scooters</li>
            <li>Mobile</li>
            <li>For Rent : Houses And Appartments</li>
            <li>Laptops</li>
        </ul>
     </div>
    </div>
  )
}

export default Catagory