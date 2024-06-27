import React, { useContext } from 'react'
import Style from './Style.module.css'
import { Link, useNavigate } from "react-router-dom"
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import InventoryIcon from '@mui/icons-material/Inventory';
import ViewListIcon from '@mui/icons-material/ViewList';
import PaymentsIcon from '@mui/icons-material/Payments';
import ArticleIcon from '@mui/icons-material/Article';
import { AdminContext } from '../../../Contexts/AdminContext';


const Sidebar = () => {

  const LoggedInAdmin = useContext(AdminContext);
  const { Admin, SetAdmin } = LoggedInAdmin
  const navigate = useNavigate();

  const AdminRole = Admin ? Admin.role : null


  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('AdminLogged');
    localStorage.removeItem('AdminToken');
    SetAdmin("");

    // Redirect to the login page
    navigate('/registration_login');
  }

  return (
    <div className={Style.sidebar}>

      <div className={Style.top}>
        <Link to="/" className={Style.logo_navigation} >
          <span className={Style.logo}>DealNBuy</span>
        </Link>
      </div>
      <hr />
      <div className={Style.center}>
        <ul>
          <Link to="/admin" className={`${Style.navigation} `} >
            <li className={` ${window.location.pathname === '/admin' ? Style.active : null}`}>
              <SpaceDashboardIcon className={Style.icons} />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/admin/products" className={Style.navigation} >
            <li className={` ${window.location.pathname === '/admin/products' ? Style.active : null}`}>
              <InventoryIcon className={Style.icons} />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/admin/users" className={Style.navigation} >
            <li className={` ${window.location.pathname === '/admin/users' ? Style.active : null}`}>
              <PersonIcon className={Style.icons} />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/admin/notifications" className={Style.navigation} >
            <li className={` ${window.location.pathname === '/admin/notifications' ? Style.active : null}`}>
              <MailIcon className={Style.icons} />
              <span>Notifications</span>
            </li>
          </Link>

          <Link to="/admin/document" className={Style.navigation} >
            <li className={` ${window.location.pathname === '/admin/document' ? Style.active : null}`}>
              <ArticleIcon className={Style.icons} />
              <span>Documents</span>
            </li>
          </Link>

          <Link to="/admin/ads" className={Style.navigation} >
            <li className={` ${window.location.pathname === '/admin/ads' ? Style.active : null}`}>
              <PaymentsIcon className={Style.icons} />
              <span>Advertisements</span>
            </li>
          </Link>

          <Link to="/admin/category" className={Style.navigation} >
            <li className={` ${window.location.pathname === '/admin/category' ? Style.active : null}`}>
              <ViewListIcon className={Style.icons} />
              <span>Category</span>
            </li>
          </Link>

          <Link to="/admin/subcategory" className={Style.navigation} >
            <li className={` ${window.location.pathname === '/admin/subcategory' ? Style.active : null}`}>
              <CategoryIcon className={Style.icons} />
              <span>SubCategory</span>
            </li>
          </Link>
          <Link to="/admin/nestedcategory" className={Style.navigation} >
            <li className={` ${window.location.pathname === '/admin/subcategory' ? Style.active : null}`}>
              <CategoryIcon className={Style.icons} />
              <span>NestedCategory</span>
            </li>
          </Link>
          {AdminRole === "superadmin" ?
            <Link to="/admin/plans" className={Style.navigation} >
              <li className={` ${window.location.pathname === '/admin/plans' ? Style.active : null}`}>
                <PaymentsIcon className={Style.icons} />
                <span>Plans</span>
              </li>
            </Link>
            : null}
          {AdminRole === "superadmin" ?
            <Link to="/admin/members" className={Style.navigation} >
              <li className={` ${window.location.pathname === '/admin/members' ? Style.active : null}`}>
                <CategoryIcon className={Style.icons} />
                <span>Admins</span>
              </li>
            </Link>
            : null}
          {AdminRole === "superadmin" ?
            <Link to="/admin/superadmins" className={Style.navigation} >
              <li className={` ${window.location.pathname === '/admin/superadmins' ? Style.active : null}`}>
                <CategoryIcon className={Style.icons} />
                <span>SuperAdmins</span>
              </li>
            </Link>
            : null}
          <Link to="/admin/profile" className={Style.navigation} >
            <li className={` ${window.location.pathname === '/admin/profile' ? Style.active : null}`}>
              <AccountCircleIcon className={Style.icons} />
              <span>Profile</span>
            </li>
          </Link>
          <li onClick={(e) => handleLogout(e)}>
            <LogoutIcon className={Style.icons} />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className={Style.bottom}>

      </div>
    </div >
  )
}

export default Sidebar