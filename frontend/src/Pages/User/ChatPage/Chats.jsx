import React, { useEffect, useLayoutEffect, useState } from 'react'
import Style from "./index.module.css"
import Navbar from '../../../Components/Navbar/Navbar'
import Footer from '../../../Components/Footer/Footer'
import Chat from '../../../Components/Chat/Chat'
import { useLocation, useParams } from 'react-router-dom';
import Breadcrumb from '../../../Components/Breadcrumb/Breadcrumb'



const Chats = () => {

    const [ConversationId, SetExistingConversation] = useState(null)
    let { conversationId } = useParams();

    useLayoutEffect(() => {
        console.log(conversationId, "conversationId");
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
                                <h2>Chats</h2>
                            </div>
                            <div className={Style.right}>
                                <span></span>
                            </div>
                        </div>
                        <div className={Style.cardWrapper}>
                            <Chat existingConverstaionId={ConversationId} />
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default Chats