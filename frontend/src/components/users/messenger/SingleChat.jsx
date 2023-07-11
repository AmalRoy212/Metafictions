import { Box, FormControl, IconButton, Input, Spinner, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { getSender, getSenderImg } from '../../../utils/chatHelper'
import UpdateGorupChat from './UpdateGorupChat';
import { createNewMessage, fetchMessages } from '../../../functionalities/userApiFunctionalities';
import { useSelector } from 'react-redux';
import ScrollChatBox from './ScrollChatBox';

function SingleChat({ currentChat, setCurrentChat, user }) {

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { token }= useSelector((state) => state.auth);

  // function fetchMessagesAgain (){
  //   fetchMessages({ token, currentChat, setLoading, setMessages })
  // }

  useEffect(() => {
    fetchMessages({ token, currentChat, setLoading, setMessages })
  },[currentChat])

  const sendMessage = (e) => {
    if(e.key === "Enter" && newMessage){
      createNewMessage({ 
        token, 
        chatId : currentChat._id, 
        content : newMessage, 
        setNewMessage, 
        messages, 
        setMessages 
      })
    }
  }

  const typingHandler = (e) => {
    setNewMessage(e.target.value);

  }

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
                  <div style={{ width: "50px", height: "50px", border: "2px solid black", borderRadius: "50%", marginRight: "1rem" }}>
                    <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src={getSenderImg(user, currentChat.users)} alt="user" />
                  </div>
                  {getSender(user, currentChat.users)}
                </div>
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
                <div style={{display:"flex",flexDirection:"column", overflowY:"scroll", scrollbarWidth:"none"}}>
                  <ScrollChatBox messages={messages} user={user} />
                </div>
              )}
              <FormControl onKeyDown={sendMessage} isRequired mt={3}>
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
    </>
  )
}

export default SingleChat
