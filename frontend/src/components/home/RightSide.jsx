import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motions";
import { Button } from "react-bootstrap";
import { followUser } from "../../functionalities/userApiFunctionalities";
import { useSelector } from "react-redux";

export default function Rightsidebar({ userSugg }) {

  const { token } = useSelector((state) => state.auth);

  const followHandler = async (_id) => {
    await followUser({ token, _id });
  }
  return (
    <>
      <div className="col-md-3">
        <div className="card gedf-card" style={{ backgroundColor: "white", borderRadius: "20px" }}>
          <div className="card-body">
            <h5 className="card-title">Suggesions</h5>
            {userSugg.map((user, index) => (<motion.div
              variants={fadeIn('right', 'tween', 0.3, 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              key={index}
              style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "5%", cursor: "pointer", backgroundColor: "#C0C0C0", borderRadius: '10px' }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px", backgroundColor: "green" }} src={user?.imgSrc} alt="" />
              </div>
              <div style={{ marginLeft: "5%", marginTop: "5px", color: "black", fontSize: 15, width:"50%" }} className="h5">{user?.name}</div>
              <div style={{ marginTop: "5px", color: "black", fontSize: 15 }} className="h5">
                <Button style={{width:"70px",height:"25px",padding:0}} className="btn-success" onClick={() => followHandler(user?._id)}>Follow</Button>
              </div>
            </motion.div>))
            }
          </div>
        </div>
      </div>
    </>
  );
}
