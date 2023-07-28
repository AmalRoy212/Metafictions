import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { FaRegTimesCircle, FaPhoneSquare } from 'react-icons/fa'
import Lottie from "lottie-react";
import { io } from "socket.io-client";
import { getSender, getSenderImg } from '../../../utils/chatHelper'
import UpdateGorupChat from './UpdateGorupChat';
import { createNewMessage, fetchMessages } from '../../../functionalities/userApiFunctionalities';
import { useDispatch, useSelector } from 'react-redux';
import ScrollChatBox from './ScrollChatBox';
import typingLoader from "../../../animations/typing.json";
import { turnOnVideoCall } from '../../../redux-toolkit/videoCallSlice';
import { useSocket } from "../../../contexts/SocketProvider";
import { useNavigate } from 'react-router-dom';
// import VideoChatHolder from '../videoCall/VideoChatHolder';
// import VideoCallNotification from '../videoCall/VideoCallNotification';
// import VideoCallRoom from '../videoCall/VideoCallRoom';
// import { setNotifcations } from '../../../redux-toolkit/actionManagerSlice';

// https://metafiction.onrender.com
// http://localhost:5000
const ENDPOINT = "https://metafiction.onrender.com"
let socket, selectedChatCampare;

function SingleChat({ currentChat, setCurrentChat, user }) {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [notification, setNotifcations] = useState([]);
  const [update, setupdate] = useState(false);
  const [room, setRoom] = useState("");


  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const secondSocket = useSocket()

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on('connected', () => setSocketConnected(true));
    socket.emit("setup",  user );
    socket.on("typing",() => setIsTyping(true));
    socket.on("stop typing",() => setIsTyping(false));
  }, [user])

  
  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setupdate(!update);
      if(!selectedChatCampare || selectedChatCampare?._id !== newMessageRecieved?.chat._id){
        if(!notification.includes(newMessageRecieved)){
          setNotifcations([newMessageRecieved, ...notification]);
          console.log(notification);
          //want to manage the user is on chat or not if user is not in the chat want to set the 
          //notification
        }
      }else{
        setMessages([...messages, newMessageRecieved])
      }
    });
  })

  useEffect(() => {
    fetchMessages({ token, currentChat, setLoading, setMessages, socket });
    selectedChatCampare = currentChat;
  }, [currentChat]);

  

  const sendMessage = (e) => {
    if (e.key === "Enter" && newMessage) {
      socket.emit("stop typing", currentChat._id);
      createNewMessage({
        token,
        chatId: currentChat._id,
        content: newMessage,
        setNewMessage,
        messages,
        setMessages,
        socket
      })
    }
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
    if(!socketConnected) return;
    if(!typing){
      setTyping(true);
      socket.emit("typing", currentChat._id);
    }
    let lastTypingTime = new  Date().getTime();
    const timeLength = 3000
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime
      if(timeDiff >= timeLength && typing){
        socket.emit("stop typing", currentChat._id);
        setTyping(false);
      }
    },timeLength)
  }

  //video call

  const handleSubmitForm = useCallback(
    (e,room) => {
      setRoom(room)
      e.preventDefault();
      secondSocket.emit("room:join", { room });
    },
    [room, secondSocket]
  );

  const handleJoinRoom = useCallback(
    () => {
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    secondSocket.on("room:join", handleJoinRoom);
    return () => {
      secondSocket.off("room:join", handleJoinRoom);
    };
  }, [secondSocket, handleJoinRoom]);

  return (
    <>
      {currentChat ?
        (<>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            style={{ display: "flex" }}
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<FaRegTimesCircle />}
              onClick={() => setCurrentChat(null)}
            />
            {!currentChat?.isGroupChat ?
              (<>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "30px", height: "30px", border: "2px solid black", borderRadius: "50%", marginRight: "1rem" }}>
                    <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src={getSenderImg(user, currentChat.users)} alt="user" />
                  </div>
                  <span style={{ display: "flex", justifyContent: 'center', alignItems: "center", fontSize:"17px" }}>{getSender(user, currentChat.users)}</span>
                </div>
                <IconButton
                  icon={<FaPhoneSquare />}
                  onClick={() => handleSubmitForm(currentChat._id)}
                />
              </>)
              :
              (<>
                <span>{currentChat?.chatName.toUpperCase()}</span>
                <UpdateGorupChat currentChat={currentChat} setCurrentChat={setCurrentChat} user={user} />
              </>)
            }
          </Text>
          <Box
            display={"flex"}
            flexDir="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="75vh"
            borderRadius="lg"
            overflow="hidden"
          >
            {loading ?
              (
                <Spinner
                  size="xl"
                  h={20}
                  w={20}
                  alignSelf="center"
                  margin="auto"
                />
              )
              :
              (
                <div style={{ display: "flex", flexDirection: "column", overflowY: "scroll", scrollbarWidth: "none" }}>
                  <ScrollChatBox messages={messages} user={user} />
                </div>
              )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping && <div style={{width:"50px",height:"50px"}}>
                  <Lottie animationData={typingLoader} loop={true} width={70} style={{marginBottom:15, marginLeft:0}} />
                </div>
              }
              <Input variant="filled" bg="E0E0E0" value={newMessage} placeholder="Enter messages.." onChange={typingHandler} />
            </FormControl>
          </Box>
        </>)
        :
        (<>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            h="100%"
          >
            <Text fontSize="3xl" pb={3} >
              Start chating
            </Text>
          </Box>
        </>)
      }
      {/* <VideoCallRoom currentChat={currentChat} user={user} /> */}
    </>
  )
}

export default SingleChat
