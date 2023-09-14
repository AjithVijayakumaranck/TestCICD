import React, { useState, useEffect } from 'react'
import Style from './Style.module.css'
import instance from '../../instance/AxiosInstance'

const Conversations = ({ conversations, currentUser }) => {

    const [Friends, SetFriends] = useState("")
    const [FriendImage, SetFriendImage] = useState("")

    // load members details
    useEffect(() => {

        const friendId = conversations.member.find((m) => m !== currentUser)

        const getUser = () => {
            try {
                instance.get(`/api/user/profile/get_profile/${friendId}`).then((res) => {
                    SetFriends(res.data)
                    SetFriendImage(res.data?.profilePicture?.url);
                }).catch((error) => {
                    console.log(error);
                })
            }
            catch (error) {
                console.log(error);
            }
        };
        getUser()
    }, [currentUser, conversations])

    return (
        <React.Fragment>
            <div className={Style.conversation}>
                <div className={Style.left} >
                    <img
                        src={
                            FriendImage
                                ? FriendImage
                                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                        }
                        alt=""
                    />
                </div>
                <div className={Style.right} >
                    <h4>{Friends?.fullname}{" "}{Friends?.surname}</h4>
                    <h6>{conversations.product ? conversations.product?.title : null}</h6>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Conversations