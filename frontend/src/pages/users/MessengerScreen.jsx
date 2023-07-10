import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { zoomIn } from "../../utils/motions"
import Leftsidebar from '../../components/home/LeftSideBar';
import { findMe } from '../../functionalities/userApiFunctionalities';
import { useSelector } from 'react-redux';
import { Button, ChakraProvider } from '@chakra-ui/react'
import MessgeSideBar from '../../components/users/messenger/MessgeSideBar';
import ChatBox from '../../components/users/messenger/ChatBox';
import { FaRegListAlt, FaRegTimesCircle } from 'react-icons/fa';

function MessageScreen() {

  const [user, setUser] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [navigator, setNavigator] = useState(false)

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    findMe({ token, setUser });
  }, [token])
  return (
    <>
      <motion.div
        variants={zoomIn(0.5,0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false , amount: 0.25}}
      >
        <div className="gradient01" style={{height:"60px",width:"100%", position:"absolute"}}/>
        <header style={{ top: 5, width: "90%", zIndex: 10, height: "50px", backgroundColor: "transparent" }}>
          {navigator ? (
            <Button onClick={() => setNavigator(false)} style={{ maxWidth: "45px", height: "45px", zIndex: 7, position: "absolute", margin: "5px" }}><FaRegTimesCircle size={20} /></Button>
          ) : (
            <Button onClick={() => setNavigator(true)} style={{ maxWidth: "45px", height: "45px", zIndex: 7, position: "absolute", margin: "5px" }}><FaRegListAlt size={20} /></Button>
          )}
        </header>
      </motion.div>
      <div className="container-fluid gedf-wrapper" style={{ backgroundColor: "#EDEDED" }}>
        <div className="row px-10">
          {navigator && <div style={{ position: "absolute", zIndex: 5, marginTop: "1rem", background:"rgba(0, 0, 0, 0.437)" }}>
            <Leftsidebar data={user} />
          </div>
          }
          <ChakraProvider>
            <div style={{ display: "flex", paddingTop: "1rem" }}>
              <MessgeSideBar setCurrentChat={setCurrentChat} currentChat={currentChat} />
              <ChatBox currentChat={currentChat} setCurrentChat={setCurrentChat} />
            </div>
          </ChakraProvider>
        </div>
      </div>
    </>
  )
}

export default MessageScreen;
