import { Button } from "react-bootstrap";
import { clearPopUp, setYesButtonChoice } from "../../redux-toolkit/actionManagerSlice";
import { useDispatch, useSelector } from "react-redux";
import { choiceHandler } from "../../functionalities/userApiFunctionalities";


function PopUp({message}) {

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth);
  const id = useSelector((state) => state.post.singlePostId);
  const noClickHandler = () => {
    dispatch(clearPopUp());
  }

  const yesClickHandler = async () => {
    dispatch(setYesButtonChoice("Delete post"));
    dispatch(clearPopUp());
    await choiceHandler({id,token,choice:"Delete post",dispatch})
  }

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
        height: "230px",
        border: "2px solid grey",
        borderRadius: "30px",
        boxShadow: "0px 0px 0px rgba(255, 255, 255, 0.526)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column",
        backgroundColor:"rgba(10, 10, 10, 0.474)",
        backdropFilter: "blur(10px)",
      }}>
        <div style={{width:"100%"}} >
          <h5 style={{color:"white",  display:"flex", justifyContent:"center", textAlign:"center",padding:"5%"}}>{message}</h5>
        </div>
        <div style={{width:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
          <Button className="btn-primary m-1" style={{width:"60px"}} onClick={noClickHandler}>No</Button>
          <Button className="btn-danger m-1" style={{width:"60px"}} onClick={yesClickHandler}>Yes</Button>
        </div>
      </div>
    </div>
        
  );
}

export default PopUp;