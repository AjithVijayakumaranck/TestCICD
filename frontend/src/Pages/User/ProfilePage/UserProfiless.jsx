import React from 'react'
import Navbar from '../../../Components/Navbar/Navbar'
import Profile from '../../../Components/Profile/UserProfile'
import Footer from '../../../Components/Footer/Footer'
import { useEffect } from 'react'
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb'
import { useLocation } from 'react-router-dom'



const UserProfile = () => {

  function ScrollToTopOnMount() {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    return null;
  }

  const location = useLocation();
  const pathSegment = location.pathname.split('/').filter((segment) => segment);

  return (
    <>
      <Navbar />
      <ScrollToTopOnMount />
      <Breadcrumb pathSegments={pathSegment} />
      <Profile />
      <Footer />
    </>
  )
}

export default UserProfile
