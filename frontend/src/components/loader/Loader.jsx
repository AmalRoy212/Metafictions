import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";


function Loader() {
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
    }}>
      <div style={{
        width: "40%",
        height: "40%",
        border: "2px solid grey",
        borderRadius: "30px",
        boxShadow: "0px 0px 0px rgba(255, 255, 255, 0.526)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(10px)",
      }}>
        <div className="sweet-loading">
          <ClipLoader
            color={color}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h3 style={{color:'white',marginTop:'2%'}}>Loading ...</h3>
        </div>
      </div>
    </div>
        
  );
}

export default Loader;