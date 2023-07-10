import { Box, IconButton, Text } from '@chakra-ui/react'
import React from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { getSender, getSenderImg } from '../../../utils/chatHelper'
import UpdateGorupChat from './UpdateGorupChat';

function SingleChat({ currentChat, setCurrentChat, user }) {

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
            h="100%"
            borderRadius="lg"
            overflow="hidden"
          >

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
