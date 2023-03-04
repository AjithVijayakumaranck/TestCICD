import React from 'react'
import Catagory from '../../Components/CatagoryBar/Catagory'
import Navbar from '../../Components/Navbar/Navbar'
import Style from './index.module.css'

const Home = () => {
  return (
    <div className={Style.home_containerr}>
      <Navbar/>
      <Catagory/>
    </div>
  )
}

export default Home