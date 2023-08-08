import React from 'react'
import Style from './Style.module.css'
import TimeAgo from 'react-timeago';

  
const Messages = ({ msg, own, offermade }) => {


    return (
        <>
            {own ?
                <div className={Style.right}>
                    <div className={offermade === true ? Style.rightofferMsg : Style.top}>
                        <p>{msg.text}</p>
                    </div>
                    <div className={Style.bottom}>
                        <TimeAgo date={msg?.createdAt} minPeriod={60} />
                    </div>
                </div>
                :
                <div className={Style.left}>
                    <div className={offermade === true ? Style.leftofferMsg : Style.top}>
                        <p>{msg.text}</p>
                    </div>
                    <div className={Style.bottom}>
                        <TimeAgo date={msg?.createdAt} minPeriod={60} />
                    </div>
                </div>
            }
        </>
    )
}

export default Messages