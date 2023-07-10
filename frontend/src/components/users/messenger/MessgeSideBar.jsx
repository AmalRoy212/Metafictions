import { Box, Button, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getChats } from '../../../functionalities/userApiFunctionalities';
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motions";
import PopUp from './PopUp';

function MessgeSideBar({ setCurrentChat }) {
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    getChats({ token, setChats })
  }, [token, chats])

  return (
    <>
      <Box
        d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir="column"
        alignItems="center"
        p={3}
        bg="white"
        w={{ base: "100%", md: "31%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          d="flex"
          w="100%"
          justifyContent="space-between"
          alignItems="center"
        >
          MyChats
          <PopUp>
            <Button
              d="flex"
              fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            // rightIcon={<AddIcon/>}
            >
              New Group Chat
            </Button>
          </PopUp>
        </Box>
        <Box
          d="flex"
          flexDir="column"
          p={3}
          bg="#F8F8F8"
          w="100%"
          h="100%"
          borderRadius="lg"
          overflow="hidden"
        >
          <Stack overflowY="scroll">
            {chats?.map((chat, index) => (
              <Box
                key={index}
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2Ac" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
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
