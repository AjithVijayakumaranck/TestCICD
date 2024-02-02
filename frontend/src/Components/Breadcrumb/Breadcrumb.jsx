import React from 'react'
import Style from "./index.module.css"
import { Link } from 'react-router-dom'
import { MdKeyboardArrowRight } from 'react-icons/md'

const Breadcrumb = ({ pathSegments, customName }) => {

  const lastSegment = pathSegments[pathSegments.length - 1];
  const isLastSegmentAnId = /^[a-fA-F0-9]{24}$/.test(lastSegment); // Assuming the ID is a 24-character hexadecimal string

  return (
    <div className={Style.breadcrumb}>
      <div className={Style.container}>
        <ul className={Style.breadcrumb_wrap}>
          <li className={Style.item} ><Link className={Style.navlink} to='/'>Home</Link> <i><MdKeyboardArrowRight /></i></li>
          {pathSegments.map((segment, index) => (
            <li className={Style.item} key={index}>
              {index === pathSegments.length - 1 && isLastSegmentAnId ? (
                <span className={Style.navlink} >{customName || lastSegment}</span>
              ) : (
                <span>
                  <Link className={Style.navlink} >{segment}</Link>
                  {index < pathSegments.length - 1 && <MdKeyboardArrowRight />}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Breadcrumb