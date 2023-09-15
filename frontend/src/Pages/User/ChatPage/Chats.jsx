import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import Style from "./index.module.css"
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import Chat from '../../../Components/Chat/Chat'
import { useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb'
import { UserContext } from '../../../Contexts/UserContext'
import authInstance from '../../../instance/AuthInstance'



const Chats = () => {


    const LoggedInUser = useContext(UserContext);
    const { User, SetUser } = LoggedInUser        //LoggedInUser Id

    const [ConversationId, SetExistingConversation] = useState(null)
    let { conversationId } = useParams();

    const [Reload, SetReload] = useState(false);

    useLayoutEffect(() => {
        if (!conversationId) {
            SetExistingConversation(ConversationId)
        }
    }, [])

    const location = useLocation();
    const pathSegment = location.pathname.split('/').filter((segment) => segment);

    function ScrollToTopOnMount() {
        window.scrollTo(0, 0);
        return null;
    }

    useEffect(() => {
        ScrollToTopOnMount();
    }, []);

    const handleRead = (ConversationId) => {
        authInstance.post(`/api/user/chat/mark_read`, { userId: User?._id, conversationId: ConversationId }).then((response) => {
            SetReload(true)
        })
    };


    return (
        <div className={Style.page_wrapper}>
            <ScrollToTopOnMount />
            <Navbar reload={Reload} />
            <div className={Style.main}>
                <Breadcrumb pathSegments={pathSegment} />
                <div className={Style.productwrapper}>
                    <div className={Style.container}>
                        <div className={Style.heading}>
                            <div className={Style.left}>
                                <h2>Chats</h2>
                            </div>
                            <div className={Style.right}>
                                <span></span>
                            </div>
                        </div>
                        <div className={Style.cardWrapper}>
                            <Chat existingConverstaionId={ConversationId} HandleRead={handleRead} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Chats