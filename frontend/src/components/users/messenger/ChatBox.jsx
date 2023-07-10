import { Box } from '@chakra-ui/react'
import React from 'react'
import SingleChat from './SingleChat'

function ChatBox({ currentChat, setCurrentChat }) {
  return (
    <>
      <Box
        display={{ base : currentChat ? "felx" : "none", md : "flex"}}
        alignItems="center"
        flexDirection="column"
        p={3}
        bg="white"
        w={{ base : "100%", md : "70%"}}
        borderRadius="lg"
        borderWidth="1px"
      >
        <SingleChat currentChat={currentChat} setCurrentChat={setCurrentChat} /> 
      </Box>
    </>
  )
}

export default ChatBox
