import { useState } from "react";



function VideoCall() {
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
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
      video chat
    </div>
  );
}

export default VideoCall;