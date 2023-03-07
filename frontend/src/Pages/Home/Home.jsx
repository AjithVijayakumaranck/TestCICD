import React from 'react'
import Catagory from '../../Components/CatagoryBar/Catagory'
import Navbar from '../../Components/Navbar/Navbar'
import Card from '../../Components/ProductCard/Card'
import SimpleSlider from '../../Components/Slider/Slider'
import Style from './index.module.css'

const Home = () => {
  return (
    <div className={Style.home_container}>
      <Navbar/>
      <Catagory/>
      <SimpleSlider/>
      <div className={Style.card_container}>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
         <Card/>
      </div>
    </div>
  )
}

export default Home