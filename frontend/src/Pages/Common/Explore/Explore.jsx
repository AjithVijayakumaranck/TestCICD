import React from 'react'
import { useParams } from 'react-router-dom'

const Explore = () => {
 const {id}= useParams()
 console.log(id,"params");
  return (
    <div>Explore</div>
  )
}

export default Explore