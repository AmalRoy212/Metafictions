import React, { useEffect, useState } from 'react';
import HomeNavbar from "../../components/home/HomeNavbar";
import { motion } from "framer-motion";
import { zoomIn } from "../../utils/motions"
import Leftsidebar from '../../components/home/LeftSideBar';
import { findMe } from '../../functionalities/userApiFunctionalities';
import { useSelector } from 'react-redux';
import OthersProfile from '../../components/users/othersProfile/OthersProfile';

function FriendsProfile() {

  const [user,setUser] = useState([]);

  const token  = useSelector((state) => state.auth.token);

  useEffect(() => {
    findMe({token,setUser});
  })
  return (
    <>
      <HomeNavbar />
      <motion.div
        variants={zoomIn(0.5,0.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false , amount: 0.25}}
      >
        <div className="gradient01" style={{height:"60px"}}/>
      </motion.div>
      <div className="container-fluid gedf-wrapper" style={{backgroundColor:"#EDEDED"}}>
        <div className="row px-10">
          <Leftsidebar data={user} />
          <OthersProfile data={user}/>
        </div>
      </div>
    </>
  )
}

export default FriendsProfile
