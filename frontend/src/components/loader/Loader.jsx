import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { PuffLoader
} from "react-spinners";


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
      overflow: "hidden"
    }}>
      <div style={{
        width: "350px",
        height: "300px",
        border: "2px solid grey",
        borderRadius: "30px",
        boxShadow: "0px 0px 0px rgba(255, 255, 255, 0.526)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"rgba(10, 10, 10, 0.474)",
        backdropFilter: "blur(10px)",
      }}>
        <div className="sweet-loading">
          <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <PuffLoader
              color={color}
              loading={loading}
              size={70}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
          <h5 style={{color:'white',marginTop:'5%'}}>Loading ...</h5>
        </div>
      </div>
    </div>
        
  );
}

export default Loader;