import React, { useState } from 'react'
import Style from './index.module.css'
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';


//fetching  
const Selector = ({ result, query }) => {


  const navigate = useNavigate()
  const [DisplayLimit, SetDisplayLimit] = useState(4)

  const CurrentCards = result.slice(0, DisplayLimit);

  const Length = result ? result.length : "0"

  return (
    <div enter="bounceIn" className={Style.Container}>
      <div className={Style.Search_wrapper}>
        <div className={Style.recentSearch}>

          {CurrentCards.map((data, index) => {
            return (
              <div className={Style.eachItems} key={index} onClick={() => navigate(`/product/${data._id}`)} >
                <div className={Style.left} >
                  <h4>{data.title}</h4>
                </div>
                <div className={Style.right} >
                  <span><BiSearch /></span>
                </div>
              </div>
            )
          })}

        </div>
        {Length > 4 ?
          <div className={Style.ShowButton}>
            <button onClick={() => { navigate(`/search/${query}`) }}>Show More</button>
          </div>
          : null
        }

      </div>

    </div>
  )
}

export default Selector