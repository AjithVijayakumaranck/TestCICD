import React, { useEffect, useState } from 'react'
import Style from "./index.module.css";
import { Link } from 'react-router-dom';

const AddCard = ({properties}) => {
    //const [valuefromApi, setValuefromApi] = useState([])
    const [widthValue, setWidthvalue] = useState(200);
    const [hovered, setHovered] = useState(false)

    //   const fetchValueFromAPi = async()=>{
    // const res = await("");
    // const data = await res.json();
    // setValuefromApi(data);

    // }
    // useEffect(()=>{
    // fetchValueFromAPi()
    // },[])

    useEffect(() => {
        if (properties.advSize === 1) {
            setWidthvalue(235);
        } else if (properties.advSize === 2) {
            setWidthvalue(490);
        } else if (properties.advSize === 3) {

            setWidthvalue(725);
        } else if (properties.advSize === 4) {
            setWidthvalue(960)
        } else {
            setWidthvalue(235);
        }
    }, [properties.advSize])

   

    return (
<div
      className={`${Style.products} ${hovered} ? 'hovered' : ""`}
      style={{ width : widthValue+'px' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img src={properties.images[0].secure_url} alt="Card" className={Style.card_image} />
      {hovered && <Link to={properties.redirectionUrl} target="_blank"><button className={Style.read_more_button}>VISIT SITE</button></Link>}
    </div>
  )
}

export default AddCard