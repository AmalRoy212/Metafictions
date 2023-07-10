import { Box, Button, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getChats } from '../../../functionalities/userApiFunctionalities';
import PopUp from './PopUp';
import SingleChatPopUp from './SingleChatPopUp';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';

function MessgeSideBar({ setCurrentChat, currentChat }) {

  const [chats, setChats] = useState([]);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    getChats({ token, setChats })
  }, [token])

  return (
    <>
      <Box
        display={{ base: currentChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
        minHeight="90vh"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          w="100%"
          style={{ display: "flex", justifyContent:"space-between", alignItems:" center"}}
        >
          MyChats
          <div style={{display:"flex"}}>
            <PopUp setChats={setChats} chats={chats}>
              <Button
                style={{ display: "flex" }}
                fontSize={{ base: "17px", md: "10px", lg: "17px" }}
              // rightIcon={<AddIcon/>}
              >
                <FaUserFriends />
              </Button>
            </PopUp>
            <SingleChatPopUp setChats={setChats} chats={chats}>
              <Button
                style={{ display: "flex" }}
                fontSize={{ base: "17px", md: "10px", lg: "17px" }}
                mx={1}
              >
                <FaUserPlus />
              </Button>
            </SingleChatPopUp>
          </div>
        </Box>
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          maxHeight="100vh"
          overflow="auto"
        >
          <Stack overflowY="scroll">
            {chats?.map((chat, index) => (
              <Box
                key={index}
                onClick={() => {
                    setCurrentChat(chat)
                  }
                }
                cursor="pointer"
                bg={currentChat === chat ? "#38B2Ac" : "#E8E8E8"}
                color={currentChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
              >
                <Text>
                  {!chat.isGroupChat ? (
                    chat.users[1].name
                  ) : (chat.chatName)}
                </Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  )
}

export default MessgeSideBar
