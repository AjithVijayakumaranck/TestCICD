import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import Style from './Slider.module.css'



const SimpleSlider = () => {

    const handleDragStart = (e) => e.preventDefault();

    const items = [
        <img src="/images/test 1.jpg" onDragStart={handleDragStart} role="presentation" />,
        <img src="/images/test 1.jpg" onDragStart={handleDragStart} role="presentation" />,
        <img src="/images/test 1.jpg" onDragStart={handleDragStart} role="presentation" />,
      ];
 
  return (
    <AliceCarousel mouseTracking items={items} className autoHeight={false}/>
  )
}

export default SimpleSlider