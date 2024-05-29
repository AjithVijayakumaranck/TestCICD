import React, { useState, useEffect, useContext, useRef } from "react";
import Style from "./Style.module.css";
import MobileView from "./MobileView";
import instance from "../../instance/AxiosInstance";
import { UserContext } from "../../Contexts/UserContext";
import Conversations from "./Conversations";
import Messages from "./Messages";

import CryptoJS from "crypto-js";
import decrypt from "../../utilities/decrypt";

import { RiSendPlaneFill } from "react-icons/ri";
import { OfflineBoltRounded } from "@mui/icons-material";
import { FaChevronDown } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { SocketContext } from "../../Contexts/socketContext";
import { useParams } from "react-router-dom";
import authInstance from "../../instance/AuthInstance";

const Chat = ({ existingConverstaionId, HandleRead }) => {
  let { conversationId } = useParams();

  const socket = useContext(SocketContext);
  const LoggedInUser = useContext(UserContext);
  const { User, SetUser } = LoggedInUser; //LoggedInUser Id
  const [currentChat, setCurrentChat] = useState(null);
  const [CurrentProfile, SetCurrentProfile] = useState(null);
  const [CurrentProfileImage, SetCurrentProfileImage] = useState(null);
  const [Conversation, SetConversation] = useState([]);
  const [Active, SetActive] = useState(false);
  const [Text, SetText] = useState({
    sender: "",
    text: "",
    createdAt: "",
    offerMade: false,
  });

  console.log(LoggedInUser, ": loged i user");

  const [Message, SetMessage] = useState([]);
  const ScrollRef = useRef();

  // const socket = useRef()

  const [ArrivalMessage, SetArrivalMessage] = useState({
    sender: "",
    text: "",
    createdAt: "",
    offerMade: false,
  });

  //Encryption & Decrytion

  const secretPass = "XkhZG4fW2t2W";

  const encryptData = () => {
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(Text.text),
      secretPass
    ).toString();
    return data;
  };

  const decryptData = (messages) => {
    let totalMessages = [];
    messages.map((eachMessages, index) => {
      const bytes = CryptoJS.AES.decrypt(eachMessages.text, secretPass);
      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      eachMessages.text = data;
      totalMessages = [...totalMessages, eachMessages];
      SetMessage(totalMessages);
    });
  };
  useEffect(() => {
    if (!conversationId || conversationId !== null) {
      fetchCurrentReceiver(conversationId);
    }
  }, []);

  //scroll down
  // useEffect(() => {
  //   const bottom = ScrollRef.current?.getBoundingClientRect();
  //   console.log(bottom);
  //   ScrollRef.current?.scrollTo({ top: bottom.y, behavior: "smooth" });
  // }, [Message]);

useEffect(() => {
  const scrollElement = ScrollRef.current;
  if (scrollElement) {
    scrollElement.scrollTo({ top: scrollElement.scrollHeight, behavior: 'smooth' });
  }
}, [Message]);


  useEffect(() => {
    // Use the socket connection

    if (socket) {
      // Subscribe to events, emit messages, etc.
      socket.emit("addUser", {
        userId: User._id,
        data: "hello guuys",
      });

      // take event from client (get message from client)
      socket.on("getMessage", (data) => {
        const decryptText = decrypt(data.text);
        SetArrivalMessage({
          ...ArrivalMessage,
          sender: data.userId,
          text: decryptText,
          createdAt: Date.now(),
          offerMade: data.offerMade,
        });
      });
    }
    return () => {
      if (socket) {
        socket.off("getMessage");
      }
    };
  }, [socket]);

  // including previous chat
  useEffect(() => {
    ArrivalMessage &&
      currentChat?.member.includes(ArrivalMessage.sender) &&
      SetMessage((prev) => [...prev, ArrivalMessage]);
  }, [ArrivalMessage, currentChat]);

  // load Conversation of user
  useEffect(() => {
    const getConersations = () => {
      try {
        authInstance
          .get(`/api/user/chat/getconversation/${User?._id}`)
          .then((res) => {
            SetConversation(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch (error) {
        console.log(error);
      }
    };
    getConersations();
  }, [User?._id]);

  // fetch current receiver profile details
  const fetchCurrentReceiver = async (conversationId) => {
    try {
      const converstionDetails = await authInstance.get(
        `/api/user/chat/getspecific_converstaion/${conversationId}`
      );
      const conversations = converstionDetails.data;
      const friendId = conversations.member.find((m) => m !== User?._id);
      instance
        .get(`/api/user/profile/get_profile/${friendId}`)
        .then((res) => {
          SetCurrentProfile(res.data);
          SetCurrentProfileImage(res.data?.profilePicture?.url);
          setCurrentChat(conversations);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // get Messages from database
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await authInstance.get(
          `/api/user/chat/getmessages/${currentChat?._id}`
        );
        decryptData(res.data?.allMessagges);
        SetMessage(res.data?.allMessagges);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat, Conversation]);

  // handleMessage event
  const handleMessage = (e) => {
    e.preventDefault();
    SetMessage([...Message, Text]);
    const NewMessage = {
      sender: User?._id,
      text: encryptData(),
      conversationId: currentChat?._id,
      offerMade: Text.offerMade,
    };

    const receiverId = CurrentProfile._id;

    if (NewMessage.offerMade === true) {
      socket.emit("sentAlert", { receiverId });
    }

    // send event to server (send message to server)
    socket.emit("sendMessage", {
      userId: User?._id, // change userId
      receiverId,
      text: encryptData(),
      offerMade: Text.offerMade,
    });

    //uploading new message into database
    try {
      authInstance
        .post("/api/user/chat/addmessage", NewMessage)
        .then((res) => {
          SetText({
            text: "",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <div className={Style.main_container}>
      <div className={Style.container}>
        <div className={Style.chat_container}>
          <div className={Style.Left_container}>
            <div className={Style.title_wrapper}>
              <h3>Messages</h3>
            </div>
            {Conversation.map((con, index) => (
              <div
                key={index}
                className={Style.clients}
                onClick={() => {
                  fetchCurrentReceiver(con._id);
                  HandleRead(con._id);
                }}
              >
                <Conversations conversations={con} currentUser={User._id} />
              </div>
            ))}
          </div>

          <div className={Style.Right_container}>
            {currentChat ? (
              <div className={Style.chat_wrapper}>
                <div className={Style.header}>
                  <div className={Style.info}>
                    <img
                      src={
                        CurrentProfileImage
                          ? CurrentProfileImage
                          : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                      }
                      alt=""
                    />
                    <h4>
                      {CurrentProfile?.fullname} {CurrentProfile?.surname}
                    </h4>
                  </div>
                  <div className={Style.closebtn}>
                    {" "}
                    <span onClick={() => setCurrentChat(null)}>
                      <RxCross2 />
                    </span>
                  </div>
                </div>

                <div className={Style.messages} ref={ScrollRef}>
                  {Message.map((m, index) => {
                    return (
                      <div key={index}>
                        <Messages
                          msg={m}
                          own={m?.sender === User?._id}
                          offermade={m?.offerMade === true}
                        />
                      </div>
                    );
                  })}
                </div>

                {Active ? (
                  <div className={Style.offerbox}>
                    <div className={Style.left}>
                      <input
                        type="number"
                        onKeyDown={handleKeyPress}
                        name="message"
                        placeholder="Type a price"
                        onChange={(e) =>
                          SetText({
                            text: e.target.value,
                            createdAt: new Date(),
                            sender: User?._id,
                            offerMade: true,
                          })
                        }
                        value={Text.text}
                      />
                      <button
                        className={Text.text === "" ? Style.buttonInactive : ""}
                        disabled={Text.text === "" ? true : false}
                        onClick={(e) => handleMessage(e)}
                      >
                        {" "}
                        <RiSendPlaneFill />
                      </button>
                    </div>
                    <div className={Style.right}>
                      <span
                        onClick={() => {
                          SetActive(!Active);
                        }}
                      >
                        <FaChevronDown />
                      </span>
                    </div>
                  </div>
                ) : (
                  <form action="" onSubmit={(e) => handleMessage(e)}>
                    <div className={Style.typebox}>
                      <input
                        type="text"
                        onKeyDown={handleKeyPress}
                        name="message"
                        placeholder="Type Message"
                        onChange={(e) =>
                          SetText({
                            text: e.target.value,
                            createdAt: new Date(),
                            sender: User?._id,
                          })
                        }
                        value={Text.text}
                      />
                      <span
                        className={Style.offerbtn}
                        disabled
                        onClick={() => {
                          SetText({ ...Text, text: "" });
                          SetActive(!Active);
                        }}
                      >
                        <OfflineBoltRounded /> <span> Make Offer </span>{" "}
                      </span>
                      <button
                        className={Text.text === "" ? Style.buttonInactive : ""}
                        disabled={Text.text === "" ? true : false}
                      >
                        <RiSendPlaneFill />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className={Style.chat_wrapper}>
                <div className={Style.empty}>
                  <img src="/Images/chat.svg" alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
        <MobileView />
      </div>
    </div>
  );
};

export default Chat;
