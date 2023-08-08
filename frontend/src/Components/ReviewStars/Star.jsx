import React from 'react'
import Style from './Style.module.css'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ stars }) => {

    const RatingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5

        return (
            <span key={index}  >
                {stars >= index + 1 ? (<FaStar className={Style.ratingIcon} />)
                    : stars >= number ? (<FaStarHalfAlt className={Style.ratingIcon} />)
                        : (<AiOutlineStar className={Style.ratingIcon} />)}
            </span>
        );
    })

    return (
        <div className={Style.Rating}>
            {RatingStar}
        </div>
    )
}

export default Star