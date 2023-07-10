import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motions";
import { getChats } from '../../../functionalities/userApiFunctionalities';
import { useSelector } from 'react-redux';

function SideDrawer({setCurrentChat}) {

  const [chats, setChats] = useState([]);
  // const [currentMessage, setCurrentMessage] = useState();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    getChats({token, setChats})
  },[token])
  
  return (
    <>
      <div className="col-md-3">
        <div className="card gedf-card" style={{ backgroundColor: "white", borderRadius: "20px", marginTop: "1rem", minHeight:"87vh" }}>
          <div className="card-body" style={{overflow:"auto", maxHeight:"87vh", padding:"1rem"}}>
            {chats?.map((chat, index) => (
              <motion.div
                onClick={() => setCurrentChat(chat)}
                variants={fadeIn('right', 'tween', 0.3, 0.3)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                key={index}
                style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "2%", cursor: "pointer", backgroundColor: "#D9D9D9", borderRadius: '10px' }}>
                <div style={{ width: "70%", display: "flex" }}>
                  <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                    <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px", backgroundColor: "green" }} src={chat?.users[1].imgSrc} />
                  </div>
                  <div style={{ marginLeft: "5%", marginTop: "5px", color: "black", fontSize: 15, width: "60%" }} className="h5">{chat?.chatName}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SideDrawer
