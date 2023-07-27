// import React, { useState } from 'react'
// import VideoChatHolder from './VideoChatHolder'
// import VideoCallNotification from './VideoCallNotification'
// import { useSelector } from 'react-redux';

// function VideoCallRoom({ currentChat, user }) {

//   const [receivingCall, setReceivingCall] = useState(false)
//   const [callAccepted, setCallAccepted] = useState(false)
//   const [name, setName] = useState("")

//   const { videoCall } = useSelector((state) => state.videoCall);

//   return (
//     <>
//       {videoCall && <VideoChatHolder 
//         currentChat={currentChat} 
//         user={user} 
//         setReceivingCall={setReceivingCall}
//         name={name}
//         setName={setName}
//         callAccepted={callAccepted}
//         setCallAccepted={setCallAccepted}
//       />}
//       {receivingCall && !callAccepted ? (
//         <VideoCallNotification user={user} />
//       ) : null}
//       {/* {user && <VideoCallNotification user={user} />} */}
//     </>
//   )
// }

// export default VideoCallRoom
