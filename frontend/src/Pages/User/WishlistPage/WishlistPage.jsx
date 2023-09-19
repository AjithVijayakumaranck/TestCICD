import React, { useEffect, useState } from 'react'
import Style from "./index.module.css"
import { useLocation } from 'react-router-dom'
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import WishlistCard from '../../../Components/Cards/WishlistCard/WishlistCard'
import { UserContext } from '../../../Contexts/UserContext';
import { useContext } from 'react'
import authInstance from '../../../instance/AuthInstance'
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb'

const WishlistPage = () => {

  const location = useLocation();
  const pathSegment = location.pathname.split('/').filter((segment) => segment);

  const LoggedInUser = useContext(UserContext);
  const { User } = LoggedInUser

  const [WishlistData, SetWishlistData] = useState([]);
  const [Reload, SetReload] = useState(false)


  const loadData = () => {
    try {
      authInstance.get(`/api/user/wishlist/get_wishlist/${User._id}`).then((Response) => {
        SetWishlistData([...Response.data])
        SetReload(false)
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, [Reload, User]);

  function ScrollToTopOnMount() {
    window.scrollTo(0, 0);
    return null;
  }

  useEffect(() => {
    ScrollToTopOnMount();
  }, []);

  return (
    <div className={Style.page_wrapper}>
      <ScrollToTopOnMount />
      <Navbar />
      <div className={Style.main}>
        <Breadcrumb pathSegments={pathSegment} />
        <div className={Style.productwrapper}>
          <div className={Style.container}>
            <div className={Style.heading}>
              <div className={Style.left}>
                <h2>Wishlist</h2>
              </div>
              <div className={Style.right}>
                <span></span>
              </div>
            </div>
            <div className={Style.cardWrapper}>
              {
                WishlistData.map((wishlistData, index) => {
                  return (
                    <WishlistCard wishlist={wishlistData.wishlist} user={User} reload={SetReload} />
                  )
                })
              }
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default WishlistPage