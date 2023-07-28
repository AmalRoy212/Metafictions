import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../../services/peer";
import { useSocket } from "../../contexts/SocketProvider";
import { IconButton } from "@chakra-ui/react";
import { FaPhoneSlash } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"

const RoomPage = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [isCalling, setIsCalling] = useState(false);
  const [answerCall, setAnswerCall] = useState(false);

  const navigate = useNavigate();

  const handleUserJoined = useCallback(({ email, id }) => {
    // console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      // console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      // console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const leaveCall = () => {
    // Step 1: Clean up event listeners
    socket.off("user:joined", handleUserJoined);
    socket.off("incomming:call", handleIncommingCall);
    socket.off("call:accepted", handleCallAccepted);
    socket.off("peer:nego:needed", handleNegoNeedIncomming);
    socket.off("peer:nego:final", handleNegoNeedFinal);

    // Step 2: Close the peer connection
    if (peer.peer) {
      peer.peer.close();
    }

    // Step 3: Clean up the streams
    if (myStream) {
      myStream.getTracks().forEach((track) => track.stop());
    }
    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => track.stop());
    }

    // Step 4: Clear the state variables
    setRemoteSocketId(null);
    setMyStream(null);
    setRemoteStream(null);
    setIsCalling(false);
    setAnswerCall(false);

    // Optionally, navigate to a different page after leaving the call
    navigate('/inbox');
  };


  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      // console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  return (
    <div style={{background:"white", width:"100%", height:"100vh"}}>
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
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "rgba(10, 10, 10, 0.474)",
          backdropFilter: "blur(10px)",
          paddingTop: ".3rem"
        }}>
          {/* <div style={{ display: "flex", position: "absolute", left: 0, marginLeft: "1rem", marginTop: "1rem", backgroundColor: "white", borderRadius: "10px", padding: "5px" }}>
            <div style={{ width: "30px", height: "30px", border: "2px solid black", borderRadius: "50%", marginRight: "1rem" }}>
              <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src={getSenderImg(user, currentChat.users)} alt="user" />
            </div>
            <span style={{ display: "flex", justifyContent: 'center', alignItems: "center", fontSize: "17px" }}>{getSender(user, currentChat.users)}</span>
          </div> */}

          <div style={{ width: "99%", height: "85%", backgroundColor: "grey", borderRadius: "30px", overflow: "hidden" }}>
            {/* <h1>Room Page</h1> */}
            {/* <h4>{remoteSocketId ? "Connected" : "No one in room"}</h4> */}
            {myStream && !remoteStream &&  (
              <div style={{ width: "100%", height: "100%" }}>
                {/* <h1>My Stream</h1> */}
                <ReactPlayer
                  playing
                  muted
                  height="100%"
                  width="100%"
                  style={{ objectFit: "cover", overflow: "hidden" }}
                  url={myStream}
                />
              </div>
            )}
            {remoteStream && (
              <div style={{width:"100%", height:"100%"}}>
                <ReactPlayer
                  playing
                  height="100%"
                  width="100%"
                  style={{objectFit:"contain", overflow:"hidden"}}
                  url={remoteStream}
                  muted
                />
                <ReactPlayer
                  playing
                  height="100px"
                  width="100px"
                  style={{objectFit:"contain",height:"100%", width:"100%", overflow:"hidden", zIndex:"10",marginTop:"-50%", border:"2px solid white", borderRadius:"15px"}}
                  url={myStream}
                  muted
                />
              </div>
            )}
          </div>

          <div style={{ width: "100%", height: "100px", display: "flex", justifyContent: 'center', alignItems: "center" }}>
            <div style={{ width: "400px", height: "70px", backgroundColor: "black", borderRadius: "20px", display: "flex", justifyContent: 'center', alignItems: "center" }}>
              <IconButton
                icon={<FaPhoneSlash color='white' />}
                onClick={leaveCall}
                style={{ borderRadius: "50%", backgroundColor: "red", width:"50px", height:"50px" }}
              />
              {remoteSocketId && <Button cursor="pointer" onClick = { handleCallUser }>Call</Button>}
              {myStream &&  <Button style={{backgroundColor:"green", marginLeft:"1rem"}} onClick={sendStreams}>Answer</Button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;