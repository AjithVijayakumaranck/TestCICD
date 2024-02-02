import React from 'react'
import Style from "./index.module.css"
import { Link, useNavigate } from 'react-router-dom'

const Footer = () => {

    const navigate = useNavigate();
    //Function to get the year 
    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    return (
        <div className={Style.Container}>
            <div className={Style.grid} >
                <div className={Style.box}>
                    <Link to='/' className={Style.navigation} > <h1>DealNBuy</h1> </Link>

                </div>

                <div className={Style.box}>
                    <h2>Company</h2>
                    <ul>
                        <Link to='/about-us' className={Style.navigation} ><li>About Us</li></Link>
                        <Link to='/legal-and-privacy/terms&condition' className={Style.navigation} ><li>Terms & Conditions</li></Link>
                        <Link to='/legal-and-privacy' className={Style.navigation} ><li>Privacy Policy</li></Link>
                        <Link to='/legal-and-privacy/cookies' className={Style.navigation} ><li> Cookies and Similar Technologies</li></Link>
                        <Link to='/help-center' className={Style.navigation} ><li>Help Center</li></Link>
                    </ul>
                </div>
                <div className={Style.box}>
                    <h2>Locations</h2>
                    <ul>
                        <li> Kannur </li>
                        {/* <li> India </li> */}
                        {/* <li onClick={() => { navigate("/contact") }} style={{ marginLeft: '10px' }} >Kannur</li> */}
                    </ul>
                </div>
                <div className={Style.box}>
                    <h2 onClick={() => { navigate("/contact") }}>Contact Us</h2>
                    <ul>
                        {/* <li>Intuitive Soft Corporation, Mizone, Mangattuparamba, Kalliasseri, Kannur , Kerala ,India. </li> */}
                        <li>Email: contact.in@dealnbuy.co.in</li>
                    </ul>
                </div>
            </div>
            <div className={Style.bottom}>
                <div className={Style.bottomleft}>
                    <p>Copyright © 2023 - {getCurrentYear()} DealNBuy. All Rights Reserved.
                        <Link to='/legal-and-privacy/terms&condition' className={Style.navigation} ><span className={Style.left}><i>Terms Of Use</i></span></Link>
                        <Link to='/legal-and-privacy' className={Style.navigation} ><span><i>Privacy Policy</i></span></Link>
                    </p>
                </div>
            </div>

        </div>
    )
}

export default Footer
