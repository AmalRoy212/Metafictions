// import React from 'react'
// import { getSender, getSenderImg } from '../../../utils/chatHelper'
// import { IconButton } from '@chakra-ui/react'
// import { FaPhoneSlash } from 'react-icons/fa'

// function VideoCallNotification({ currentChat, user }) {
//   return (
//     <>
//       <div style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         zIndex: 10,
//         display: "flex",
//         justifyContent: "center",
//         // alignItems: "center",
//         marginTop:"7rem",
//         overflow: "hidden"
//       }}>
//         <div style={{
//           width: "400px",
//           height: "250px",
//           border: "2px solid grey",
//           borderRadius: "30px",
//           boxShadow: "0px 0px 0px rgba(255, 255, 255, 0.526)",
//           display: "flex",
//           alignItems: "center",
//           flexDirection: "column",
//           backgroundColor: "rgba(10, 10, 10, 0.474)",
//           backdropFilter: "blur(10px)",
//           paddingTop: ".3rem"
//         }}>
//           <div style={{ display: "flex", marginLeft: "1rem", marginTop: "1rem", borderRadius: "10px", padding: "5px", flexDirection:"column", justifyContent:"center", alignItems:"center" }}>
//             <div style={{ width: "60px", height: "60px", border: "2px solid black", borderRadius: "50%", marginRight: "1rem" }}>
//               <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src={user.imgSrc} alt="user" />
//             </div>
//             <span style={{ fontSize: "20px", color:"white", marginLeft:"-1rem" }}>{user.name} is Calling ...</span>
//             <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", width:"100%", height:"100px", marginLeft:"-1.5rem"}}>
//               <IconButton
//                 icon={<FaPhoneSlash color='white' />}
//                 onClick={() => dispatch(turnOffVideoCall())}
//                 style={{ borderRadius: "50%", backgroundColor: "green" }}
//               />
//               <IconButton
//                 icon={<FaPhoneSlash color='white' />}
//                 onClick={() => dispatch(turnOffVideoCall())}
//                 style={{ borderRadius: "50%", backgroundColor: "red" }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default VideoCallNotification