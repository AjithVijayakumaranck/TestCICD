import React from 'react'
import { FaStar } from 'react-icons/fa'
import { IoLocation, IoLocationOutline } from 'react-icons/io5'
import Style from './index.module.css'
import { AiFillHeart } from "react-icons/ai";

const Card = () => {
    const testArray = [1,1,1,1,1]
  return (
    <div className={Style.Card_wrapper}>
        <div className={Style.featured}><p>FEAURED</p></div>
        <div className={Style.image_wrapper}>
         <img src="/Images/test 1.jpg"  style={{ maxHeight: '100%', maxWidth: '100%' }} />
        </div>
        <div className={Style.Details}>
       <div>
       <h3>Corvet z99 2021</h3>
            <h1>$ 18,000</h1>   
       </div>
            <div className={Style.Rating}>
            <div>
           {
                   testArray.map(()=>{
                       return (
                           <FaStar className={Style.ratingIcon}/>
                           )
                        })
                    }
            </div>
               <p>54 Reviews</p>
               </div>
            <h5><IoLocationOutline className={Style.icon}/><span>Palakkad/kerala</span></h5>
        </div>
        <div className={Style.Button_wrapper}>
            <div className={Style.Fav}>
            <button><AiFillHeart/></button>
            <p>Favourite</p>
            </div>
            <div className={Style.Explore}>
            <button>Explore</button>
            </div>
        </div>
    </div>
  )
}

export default Card