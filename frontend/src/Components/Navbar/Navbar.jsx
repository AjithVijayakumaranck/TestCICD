import React, { useContext, useEffect, useState } from 'react'
import Style from "./index.module.css"
import { BsBell, BsBellFill, BsChat, BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseOutline } from "react-icons/io5";
import 'animate.css';
import { CategoryContext } from '../../Contexts/CategoryContext';
import Options from '../Profile_Selector/Options'
import { Link } from "react-router-dom"
import { RiAdvertisementLine } from "react-icons/ri";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { BiPurchaseTag, BiLogOut } from "react-icons/bi";
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import { UserContext } from '../../Contexts/UserContext';
import { SocketContext } from '../../Contexts/socketContext';
import instance from '../../instance/AxiosInstance';
import Selector from '../Search_Selector/Selector';



const Navbar = ({ location, setLocation }) => {


  const LoggedInUser = useContext(UserContext);
  const { User, SetUser } = LoggedInUser        //LoggedInUser Id

  const categories = useContext(CategoryContext)
  const socket = useContext(SocketContext);

  const { Categories, SetCategories } = categories
  const [Toggle, setToggle] = useState(false)
  const [ToggleSelector, SetToggleSelector] = useState(false)
  //const [isVisible, setIsVisible] = useState(false)
  const [ToggleOpt, setOpt] = useState(false)
  const [Selected, SetSelected] = useState(false)
  const [NewMessages, SetNewMessages] = useState(false)
  const [UserData, SetUserData] = useState({})
  const [UserImage, SetUserImage] = useState('')
  const [SearchQuery, SetSearchQuery] = useState('')
  const [SearchResult, SetSearchResult] = useState([])



  const HandleSearch = () => {
    try {
      instance.get(`/api/user/filter/search_products?SearchQuery=${SearchQuery}&&limit=${5}`).then((response) => {
        // console.log(response.data, "search result");
        SetSearchResult(response.data)
      }).catch((err) => {
        console.log(err);
      })
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    HandleSearch()
  }, [SearchQuery])

  const HandleSelector = (e) => {
    e.preventDefault()

    if (e.target.value !== "") {
      SetToggleSelector(true)
    } else {
      SetToggleSelector(false)
    }
  }



  //Setting New Messages in Alert
  useEffect(() => {
    if (socket) {
      socket.on('notificationAlert', (data) => {
        //console.log(data, "helllo00");
        SetNewMessages(data.Alert)
      })
    }
  }, [socket])



  useEffect(() => {
    try {
      instance.get(`/api/user/profile/get_profile/${User._id}`).then((Response) => {
        SetUserData({ ...Response.data })
        SetUserImage(Response.data.profilePicture?.url)
      }).catch((err) => {
        console.log(err)
      });
    } catch (error) {
      console.log(error);
    }
  }, [User._id]);



  // const options = []

  // useEffect(() => {
  //   Categories.map((category) => {
  //     options.push({ value: category.categoryName, label: category.categoryName })
  //   })
  // }, [options])




  return (
    <div className={Style.header_container}>
      <div className={Style.Container}>
        <div className={Style.Branding}>

          <div>
            <button onClick={() => {
              setToggle(true)
              // setIsVisible(true)
            }} className={`${Style.Toggle}`}><GiHamburgerMenu /></button>
            <Link to='/' className={Style.navigation} > <h1>DealNBuy</h1> </Link>
          </div>

          {/* <div className={Style.location} onClick={() => { setLoc(!ToggleLoc) }}>
            {ToggleLoc && <Location location={location} setLocation={setLocation} />}
            <IoLocation />
            <h5>Palakkad</h5>
          </div> */}

        </div>

        <div className={Style.Search}>

          <div className={Style.Search_container}>
            <input
              type="search"
              placeholder='Search Here'
              value={SearchQuery}
              onChange={(e) => {
                SetSearchQuery(e.target.value)
                HandleSelector(e)
              }}
            />
            <button onClick={HandleSearch}><BsSearch /></button>
          </div>

          {ToggleSelector && <Selector result={SearchResult} query={SearchQuery} />}
        </div>

        <div className={Style.Options}>
          <Link to='/chat' className={Style.navigation} > <BsChat className={Style.icon} /> </Link>
          <Link to='/notification' className={Style.navigation} >{NewMessages ? <BsBellFill className={Style.icon} /> : <BsBell className={Style.icon} />} </Link>

          {User._id ?
            <div className={Style.profile} onClick={() => { setOpt(!ToggleOpt) }} >
              <img
                src={UserImage ?
                  UserImage
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="profile pricture "
              />
              {ToggleOpt && <Options data={UserData} Image={UserImage} />}
            </div>
            :
            <div className={Style.RegButtonContainer}>
              <Link to='/registration_login' className={Style.navigation} > <button>Login</button></Link>
            </div>
          }

          <div className={Style.ButtonContainer}>
            <Link to='/postadd' className={Style.navigation} > <button>Post Ad</button></Link>
          </div>
        </div>
        {
          Toggle ? <div className={`${Style.Mobile_screen} ${Toggle ? Style.in : Style.out}`}>

            <div className={Style.logoContainer}>
              <div className={Style.logo_wrap}>
                <h1>DealNBuy</h1>
              </div>
              <div>
                <button> <IoCloseOutline onClick={() => setToggle(false)} /></button>
              </div>
            </div>

            <div className={Style.ProfileContainer}>
              {User._id ?
                <div className={Style.profile_wrap}>
                  <div className={Style.profile}>
                    <img
                      src={UserImage ?
                        UserImage
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt="nav profile pricture "
                    />

                  </div>
                  <div>
                    <h6>"Hello"</h6>
                    <h4>{UserData.fullname} {UserData.surname}</h4>
                    <Link to='/profile' className={Style.navigation} ><h5>View and edit Profile</h5> </Link>
                  </div>
                </div>
                :
                <div className={Style.profile_wrap}>
                  <Link to='/registration_login' className={Style.navigation} > <button>Login / SignUp</button></Link>
                </div>
              }
            </div>

            <div className={Style.categoryContainer}>
              <div className={Style.accordion}>
                <div className={Style.item}  >
                  <div className={Style.title}>
                    <h3>Category</h3>
                    <span>{Selected ? <SlArrowUp onClick={() => SetSelected(false)} /> : <SlArrowDown onClick={() => SetSelected(true)} />} </span>
                  </div>

                  <div className={Selected ? Style.show : Style.content} >
                    {Categories.map((data, index) => {
                      return (
                        <div className={Style.row} key={index}>
                          <h3>{data?.categoryName}</h3>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className={Style.menuContainer}>
              <div className={Style.menutitle}>
                <h4>Menu</h4>
              </div>
              <div className={Style.menu_wrap}>

                <ul>
                  <Link to="/postadd" className={Style.navigation} >
                    <li>
                      <BsChat className={Style.icons} />
                      <span>PostAd</span>
                    </li>
                  </Link>
                  <Link to="/chat" className={Style.navigation} >
                    <li>
                      <BsChat className={Style.icons} />
                      <span>Chats</span>
                    </li>
                  </Link>
                  <Link to="/notification" className={Style.navigation} >
                    <li>
                      <BsBell className={Style.icons} />
                      <span>Alerts</span>
                    </li>
                  </Link>
                  <Link to="/myads" className={Style.navigation} >
                    <li>
                      <RiAdvertisementLine className={Style.icons} />
                      <span>My Ads</span>
                    </li>
                  </Link>

                  <Link to="/subscribe" className={Style.navigation} >
                    <li>
                      <BiPurchaseTag className={Style.icons} />
                      <span>Purchase Ads</span>
                    </li>
                  </Link>

                  <Link to="/wishlist" className={Style.navigation} >
                    <li>
                      <MdOutlineFavoriteBorder className={Style.icons} />
                      <span>Wishlist</span>
                    </li>
                  </Link>
                  {User._id ?
                    <li>
                      <BiLogOut className={Style.icons} />
                      <span>Logout</span>
                    </li>
                    : null
                  }

                </ul>

              </div>
            </div>



          </div> : ""
        }
      </div>
    </div>
  )
}

export default Navbar