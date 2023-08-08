import React from 'react'
import Style from "./index.module.css"


const HomeCarouselCard = ({ item }) => {
    
    
    return (
        <div className={Style.box}>
            <div className={Style.img_Container}>
                <img src={item?.image.url} alt='' style={{ maxHeight: '100%', maxWidth: '100%' }} />
            </div>
        </div>
    )
}

export default HomeCarouselCard