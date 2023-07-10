import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'

function SingleChat({ currentChat, setCurrentChat }) {
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
                {currentChat.users[1].name}
              </>)
              :
              (<>
                {currentChat?.chatName.toUpperCase()}
              </>)
            }
          </Text>
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
