import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../contexts/SocketProvider";
import { Button } from "react-bootstrap";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <>
      <div className="col-md-9 gedf-main" style={{ marginBottom: "10px", marginTop: "1rem", borderRadius: "30px", height: "87vh", overflow:"hidden", backgroundColor:"white", padding:"2rem", display:"flex", justifyContent:"center", alignItems:"center" }}>
        <div className="card gedf-card" style={{background:"none"}}>
          <div style={{ backgroundColor: "#E8E8E8", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", height:"300px", width:"100%", borderRadius:"30px", padding:"5rem" }}>
            <h5 style={{marginTop:"-2rem", marginBottom:"2rem"}}>Create Chat Room</h5>
            <form onSubmit={handleSubmitForm}>
              <label htmlFor="email">Email ID</label>
              <br />
              <input
                style={{width:"100%", borderRadius:"10px", border:"2 px solid grey"}}
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <label htmlFor="room">Room Number</label>
              <br />
              <input
                style={{ width: "100%", borderRadius: "10px", border: "2 px solid grey" }}
                type="text"
                id="room"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />
              <br />
              <br />
              <Button type="submit" style={{alignSelf:"center"}}>Join Room</Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LobbyScreen;