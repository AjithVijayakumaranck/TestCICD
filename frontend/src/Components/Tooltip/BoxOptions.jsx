import React from 'react'
import Style from "./index.module.css"
import { Link } from "react-router-dom"




const BoxOptions = () => {

  return (

    <div enter="bounceIn" className={Style.option_wrapper}>
      <div className={Style.box}>
        <div className={Style.boxWrapper}>

          <Link to='' className={Style.navigation} >
            <div className={Style.eachopt}>
              <h4>Sell your products</h4>
            </div>
          </Link>

          <Link to='' className={Style.navigation} >
            <div className={Style.eachopt}>
              <h4>List your Business</h4>
            </div>
          </Link>

          <Link to='' className={Style.navigation} >
            <div className={Style.eachopt}>
              <h4>Hire Candiates</h4>
            </div>
          </Link>

        </div>
      </div>
    </div >
  )
}

export default BoxOptions
