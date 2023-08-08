import React from 'react'
import Style from './Style.module.css'
import Slider from "react-slick"
import { BsChevronRight } from "react-icons/bs"
import { BsChevronLeft } from "react-icons/bs"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Plancard from '../../CarouselCard/SubscriptionCard/Plancard'



const SampleNextArrow = (props) => {
  const { onClick } = props
  return (
    <div className={Style.control_btn} onClick={onClick}>
      <button className={Style.next}>
        <i > <BsChevronRight /> </i>
      </button>
    </div>
  )
}
const SamplePrevArrow = (props) => {
  const { onClick } = props
  return (
    <div className={Style.control_btn} onClick={onClick}>
      <button className={Style.prev}>
        <i > <BsChevronLeft /> </i>
      </button>
    </div>
  )
}


const SubscriptionCarousel = ({ Subscriptions }) => {

 
  const totalSlides = Subscriptions.length;
 
  const settings = {

    className: 'center',
    centerMode: true,
    infinite: true,
    dots: true,
    centerPadding: '10px',
    slidesToShow: Math.min(totalSlides, 3),
    slidesToScroll: Math.min(totalSlides, 3),
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '10px',
          slidesToShow: Math.min(totalSlides, 3),
          slidesToScroll: Math.min(totalSlides, 3),
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '5px',
          slidesToShow: Math.min(totalSlides, 2),
          slidesToScroll: Math.min(totalSlides, 2),
          initialSlide: 2,
        },
      },
      {
        breakpoint: 430,
        settings: {
          centerPadding: '5px',
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={Style.items}>
      <Slider {...settings}>
        {
          Subscriptions.map((item, index) => {
            return (
              <Plancard key={index} item={item} />
            )
          })
        }
      </Slider>
    </div>
  )
}

export default SubscriptionCarousel