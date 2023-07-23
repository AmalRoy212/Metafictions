import React, { useEffect, useRef, useState } from "react";
import { getSender, getSenderImg } from '../../../utils/chatHelper';
import { Button, IconButton } from '@chakra-ui/react';
import { FaBrush, FaPhoneSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { turnOffVideoCall } from '../../../redux-toolkit/videoCallSlice';
// import Peer from "simple-peer";
import io from "socket.io-client";
import { CopyToClipboard } from "react-copy-to-clipboard";

// Polyfill for crypto.getRandomValues() for older browsers
if (!window.crypto && window.msCrypto) {
  window.crypto = window.msCrypto;
}

// Check for support for crypto.getRandomValues()
if (!window.crypto || !window.crypto.getRandomValues) {
  // Provide a fallback implementation using the polyfill
  window.crypto.getRandomValues = function (array) {
    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return array;
  };
}

const socket = io.connect('http://localhost:5000');

function VideoChatHolder({ currentChat, user, name, setName, callAccepted, setCallAccepted, setReceivingCall }) {

  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState("");
  const [idToCall, setIdToCall] = useState("");
  const [callEnded, setCallEnded] = useState(false);

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const dispatch = useDispatch();

  const idToCallUser = currentChat?.users[0]._id === user.userId ? currentChat?.users[1] : currentChat?.users[0];

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });

    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    console.log(id, "***********");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream
    });

    peer.on("signal", (data) => {
      socket.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: me,
        name: name
      });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on("callAccepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });

    peer.on("stream", (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    dispatch(turnOffVideoCall());
    setCallEnded(true);
    connectionRef.current.destroy();
  };

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
          alignItems: "center",
          flexDirection: "column",
          backgroundColor: "rgba(10, 10, 10, 0.474)",
          backdropFilter: "blur(10px)",
          paddingTop: ".3rem"
        }}>
          <div style={{ display: "flex", position: "absolute", left: 0, marginLeft: "1rem", marginTop: "1rem", backgroundColor: "white", borderRadius: "10px", padding: "5px" }}>
            <div style={{ width: "30px", height: "30px", border: "2px solid black", borderRadius: "50%", marginRight: "1rem" }}>
              <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} src={getSenderImg(user, currentChat.users)} alt="user" />
            </div>
            <span style={{ display: "flex", justifyContent: 'center', alignItems: "center", fontSize: "17px" }}>{getSender(user, currentChat.users)}</span>
          </div>


          <div style={{ width: "99%", height: "85%", backgroundColor: "grey", borderRadius: "30px", overflow: "hidden" }}>
            <video playsInline muted ref={myVideo} autoPlay style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div>
              {callAccepted && !callEnded ?
                (<>
                  <video playsInline muted ref={userVideo} autoPlay style={{ width: "100%" }} />
                  <video playsInline muted ref={myVideo} autoPlay style={{ width: "130px", position: "absolute", marginTop: "-9rem", marginLeft: "2rem", borderRadius: "10px" }} />
                </>)
                :
                null}
            </div>
          </div>



          <div style={{ width: "100%", height: "100px", display: "flex", justifyContent: 'center', alignItems: "center" }}>
            <div style={{ width: "400px", height: "70px", backgroundColor: "black", borderRadius: "20px", display: "flex", justifyContent: 'center', alignItems: "center" }}>
              <IconButton
                icon={<FaPhoneSlash color='white' />}
                onClick={leaveCall}
                style={{ borderRadius: "50%", backgroundColor: "red" }}
              />
              
              <Button cursor="pointer" onClick={() => callUser(idToCallUser._id)}>Call</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoChatHolder;
