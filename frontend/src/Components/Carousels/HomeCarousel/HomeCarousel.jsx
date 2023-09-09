import React from 'react'
import Style from "./index.module.css"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import HomeCarouselCard from '../../CarouselCard/HomeCarouselCard/HomeCarouselCard'


const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className={Style.control_btn} onClick={onClick}>
      <button className={Style.next}>
        <i> <IoIosArrowForward /> </i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className={Style.control_btn} onClick={onClick}>
      <button className={Style.prev}>
        <i> <IoIosArrowBack /> </i>
      </button>
    </div>
  )
}

const HomeCarousel = ({ items }) => {


  const settings = {
    infinite: true,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: true,
    autoplaySpeed: 2500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <div className={Style.carouserl_wrap}>
      <Slider {...settings}>
        {items.map((item, index) => {
          return (
           <HomeCarouselCard  item={item} key={index}/>
          )
        })}
      </Slider>
    </div>
  )
}

export default HomeCarousel