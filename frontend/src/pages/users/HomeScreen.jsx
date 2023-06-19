import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { motion } from 'framer-motion';
import { setPostCount } from "../../redux-toolkit/postSlice";
import { zoomIn } from "../../utils/motions"
import axios from "../../configs/axios"
import Leftsidebar from "../../components/home/LeftSideBar";
import Maincontent from "../../components/home/MainContent";
import HomeNavbar from "../../components/home/HomeNavbar";
import Rightsidebar from "../../components/home/RightSide";
import Loader from "../../components/loader/Loader";
import { setLoading, clearLoading } from "../../redux-toolkit/loadingSlice"
import "../../styles/styles.css";
// import "./styles.css";

function HomeScreen() {

  const [user,setUser] = useState({})
  const [posts,setPosts] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const post = useSelector((state) => state.post.count);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(setLoading())
    axios.get('/users/post',{
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setPosts(res.data);
      dispatch(setPostCount(res.data.length));
    })
    axios.get('/users/find', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      setUser(res.data);
      dispatch(clearLoading());
    });
    
  },[post,token])

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
          {/* <Rightsidebar /> */}
        </div>
      </div>
    </>
  )
}

export default HomeScreen
