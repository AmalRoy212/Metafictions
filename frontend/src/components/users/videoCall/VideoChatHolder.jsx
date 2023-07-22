import React, { useEffect } from 'react'
import { getSender, getSenderImg } from '../../../utils/chatHelper'
import { IconButton } from '@chakra-ui/react'
import { FaPhoneSlash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { turnOffVideoCall } from '../../../redux-toolkit/videoCallSlice'

function VideoChatHolder({ currentChat, user }) {

  const dispatch = useDispatch();

  return (
    <div>
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(28, 28, 28, 0.32)",
        overflow: "hidden"
      }}>
        <div style={{
          width: "95%",
          height: "90%",
          border: "2px solid grey",
          borderRadius: "30px",
          boxShadow: "0px 0px 0px rgba(255, 255, 255, 0.526)",
          display: "flex",
          alignItems:"center",
          flexDirection: "column",
          backgroundColor: "rgba(10, 10, 10, 0.474)",
          backdropFilter: "blur(10px)",
          paddingTop:".3rem"
        }}>
          <div style={{ display: "flex", position: "absolute", left: 0, marginLeft: "1rem", marginTop: "1rem", backgroundColor: "white", borderRadius:"10px", padding:"5px"}}>
            <div style={{ width: "30px", height: "30px", border: "2px solid black", borderRadius: "50%", marginRight: "1rem" }}>
              <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src={getSenderImg(user, currentChat.users)} alt="user" />
            </div>
            <span style={{ display: "flex", justifyContent: 'center', alignItems: "center", fontSize: "17px"}}>{getSender(user, currentChat.users)}</span>
          </div>
          <div style={{ width: "99%", height: "85%", backgroundColor: "grey", borderRadius: "30px",}}>
          </div>
          <div style={{width:"100%", height:"100px", display:"flex", justifyContent:'center', alignItems:"center"}}>
            <div style={{ width: "400px", height: "70px", backgroundColor: "black", borderRadius: "20px", display: "flex", justifyContent: 'center', alignItems: "center" }}>
              <IconButton
                icon={<FaPhoneSlash color='white'/>}
                onClick={() => dispatch(turnOffVideoCall())}
                style={{borderRadius:"50%", backgroundColor:"red"}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoChatHolder
