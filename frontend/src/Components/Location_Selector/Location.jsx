import React from 'react'
import Style from './index.module.css'
import { MdMyLocation } from "react-icons/md";
import instance from '../../instance/AxiosInstance';


//fetching  
const Location = ({ setLocation, location }) => {

  const onChangeHandler = (e) => {
    instance.get(`api/user/filter/get_location?location=${e.target.value}`).then((response) => {
      if (response.data.features.length === 0) {
      } else {
        setLocation([...response.data.features])
      }
    })
  }


  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  }



  return (
    <div enter="bounceIn" className={Style.location_wrapper}>
      <div className={Style.search}>
        <input type="text" name="" onChange={(e) => onChangeHandler(e)} placeholder='Search Locality' id="" />
      </div>
      <div className={Style.recentLocations}>
        <div>
          {
            location.map((eachLoc) => {
              return (
                <div className={Style.eachLoc}>
                  <h4>{eachLoc.text}</h4>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className={Style.currentLocation} onClick={getCurrentLocation}>
        <MdMyLocation />
        <div >
          <h3>Current Location</h3>
          <p>Use your current locality as search area</p>
        </div>
      </div>
      <div className={Style.recentLocations}>
        <h3>Recent Locations</h3>
        <div>
          <div className={Style.eachLoc}>
            <h4>Palakkad</h4>
          </div>
          <div className={Style.eachLoc}>
            <h4>Kovalamd</h4>
          </div>
          <div className={Style.eachLoc}>
            <h4>Kochi</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Location