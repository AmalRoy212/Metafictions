import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { motion } from 'framer-motion';
import { zoomIn } from "../../utils/motions"
import Leftsidebar from "../../components/home/LeftSideBar";
import Maincontent from "../../components/home/MainContent";
import HomeNavbar from "../../components/home/HomeNavbar";
import Rightsidebar from "../../components/home/RightSide";
import { loadHome } from "../../functionalities/userApiFunctionalities"
import "../../styles/styles.css";
import { setLiked } from "../../redux-toolkit/actionManagerSlice";

function HomeScreen() {

  const [user,setUser] = useState({})
  const [posts,setPosts] = useState([]);
  const [userSugg,setUserSugg] = useState([]);
  // const [follow,setfolow] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post.count);
  const followCount = useSelector((state) => state.post.followCount);
  const liked = useSelector((state) => state.post.liked);
  const dispatch = useDispatch();

  useEffect(() =>{
    loadHome({
      token, 
      setPosts, 
      setUser, 
      setUserSugg, 
      dispatch,
      liked
    })
  },[post,token,followCount])

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
          <Maincontent data={user} posts={posts} />
          <Rightsidebar userSugg={userSugg} />
        </div>
      </div>
    </>
  )
}

export default HomeScreen
