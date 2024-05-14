import React, { useState } from 'react'
import Login from '../../../Components/Login/Login'
import Signup from '../../../Components/Signup/Signup'
import style from './index.module.css'

const Registration_login = () => {

  const [signup, setSignup] = useState(false)

  return (
    <div className={style.Registration_wrapper}>
      {signup ? <Signup setLogin={setSignup} /> : <Login setLogin={setSignup} />}
    </div>
  )
}

export default Registration_login