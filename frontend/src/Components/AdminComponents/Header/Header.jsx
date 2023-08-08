import React from 'react'
import Style from './Style.module.css'
import LanguageIcon from '@mui/icons-material/Language';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import SearchIcon from '@mui/icons-material/Search';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { useNavigate } from 'react-router-dom';


const Header = () => {

  const Navigate = useNavigate();

  return (
    <div className={Style.Header}>
      <div className={Style.wrapper}>
        <div className={Style.search}>
          <input type="text" placeholder='Search' />
          <SearchIcon />
        </div>
        <div className={Style.items}>
          <div className={Style.item}>
            <LanguageIcon className={Style.icon} />
            English
          </div>
          <div className={Style.item}>
            <DarkModeOutlinedIcon className={Style.icon} />
          </div>
          <div className={Style.item} onClick={()=>Navigate('/admin/messages')}>
            <MailOutlinedIcon className={Style.icon} />
            <div className={Style.counter} > 0 </div>
          </div>
          <div className={Style.item}>
            
            <img
                src="https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                alt="adminImage"
                className={Style.avatar}
              />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header