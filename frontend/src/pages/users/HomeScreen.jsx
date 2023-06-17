import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { motion } from 'framer-motion';
import { fadeIn, navVariants, zoomIn } from "../../utils/motions"
import axios from "../../configs/axios"
import Leftsidebar from "../../components/home/LeftSideBar";
import Maincontent from "../../components/home/MainContent";
import HomeNavbar from "../../components/home/HomeNavbar";
import Rightsidebar from "../../components/home/RightSide";
import "../../styles/styles.css"
// import "./styles.css";

function HomeScreen() {

  const [user,setUser] = useState({})
  const { token } = useSelector((state) => state.auth)

  useEffect(() =>{
    axios.get('/users/find', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data);
      setUser(res.data);
    });
    
  },[])

  return (
    <>
      <HomeNavbar />
      <motion.div
        variants={zoomIn(0.5,0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false , amount: 0.25}}
      >
        <div className="gradient01"/>
      </motion.div>
      <div className="container-fluid gedf-wrapper">
        <div className="row">
          <Leftsidebar data={user} />
          <Maincontent />
          <Rightsidebar />
        </div>
      </div>
    </>
  )
}

export default HomeScreen
