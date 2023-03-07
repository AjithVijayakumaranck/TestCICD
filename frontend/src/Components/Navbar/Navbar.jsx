import React, { useState } from 'react'
import Style from "./index.module.css"
import { } from 'react-icons/fa';
import { BsBell, BsChat, BsFillCompassFill, BsHammer, BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline, IoLocation } from "react-icons/io5";
import Select from 'react-select'


const Navbar = () => {

    const [Toggle,setToggle]= useState(false)

    const [isVisible, setIsVisible] = useState(false);

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
      ]


    const customStyles = {
        option: (defaultStyles, state) => ({
          ...defaultStyles,
          color: state.isSelected ? "#212529" : "#000",
          backgroundColor: state.isSelected ? "transparent" : "transparent",
        }),
        control: (defaultStyles) => ({
            ...defaultStyles,
            backgroundColor: "transparent",
            padding: "10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            boxShadow: "none",
            width:"10rem"
          }),
          singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#000" }),
    }

  return (
    <div className={Style.Container}>
     <div className={Style.Branding}>
      <div>
     <button onClick={()=>{
      setToggle(true)
      setIsVisible(true)
    }} className={`${Style.Toggle}`}><GiHamburgerMenu /></button>
     <h1>DealNBuy</h1>
      </div>
        <div className={Style.location}>
          <IoLocation/>
          <h5>Palakkad</h5>
        </div>
     </div>
     <div className={Style.Search}>
    <div className={Style.Search_container}>  <div>
        <Select options={options} styles={customStyles}  className={Style.basic_single} /> 
        </div>
        <input type="text"  placeholder='Search Here'/>
        <button><BsSearch/></button></div>
     </div>
     <div className={Style.Options}>
        <BsChat className={Style.icon}/>
        <BsBell className={Style.icon}/>
        <div className={Style.profile}>
          <img src="/imgs/profile.jpg" alt="" />
        </div>
        <div className={Style.ButtonContainer}>
        <button>Post Add</button>
        </div>
     </div>
  {
    Toggle ?    <div  className={`${Style.Mobile_screen} ${Toggle ? Style.in : Style.out}`}>
       
    <div className={Style.ProfileContainer}>
    <div>
     <button> <IoCloseOutline onClick={()=>setToggle(false)}/></button>
    </div>
    <div className={Style.profile_wrap}>
    <div className={Style.profile}>
       <img src="/imgs/profile.jpg" alt="" />
     </div>
    <div>
    <h6>"Hello"</h6>
       <h4>Ajith Vijayakumaran</h4>
       <h5>View and edit Profile</h5>
    </div>  
    </div>
    </div>
  </div> : ""
  }
    </div>
  )
}

export default Navbar