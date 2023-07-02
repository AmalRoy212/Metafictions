import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motions";
import { useDispatch, useSelector } from "react-redux";
import { FaFacebookMessenger, FaQrcode, FaExpand } from "react-icons/fa"
import UpdateUser from '../userUpdate/UpdateUser';
import { MDBBtn } from 'mdb-react-ui-kit';
import { findMyFriends } from "../../../functionalities/userApiFunctionalities";
import QRCode from "../../qrCode/QRCode";
import { Button } from "react-bootstrap";
import QRScanner from "../../qrCode/QRScanner";

export default function ProfileRightSide({ data }) {

  const [edit, setEdit] = useState(false);
  const [friends, setFriends] = useState([]);
  const [scanner, setScanner] = useState(true);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    findMyFriends({ token, setFriends })
  }, [])

  return (
    <>
      {edit && <UpdateUser data={data} setEdit={setEdit} />}
      <div className="col-md-3">
        <div className="card gedf-card" style={{ backgroundColor: "white", borderRadius: "20px", marginTop: "1rem", padding: "1rem" }}>
          {scanner ?
            (<QRCode userId={data?.userId} />)
            :
            (<QRScanner />)
          }
          <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Button className="m-2" variant="dark" onClick={() => setScanner(true)}><FaQrcode size={20} /></Button>
            <Button className="m-2" variant="dark" onClick={() => setScanner(false)}><FaExpand size={20} /></Button>
          </div>
          <motion.div
            variants={fadeIn('right', 'tween', 0.3, 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "5%", cursor: "pointer", backgroundColor: "#C0C0C0", borderRadius: '10px' }}>
            <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
              {/* <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px", backgroundColor: "green" }} src={user?.imgSrc} alt="" /> */}
            </div>
            <div style={{ marginLeft: "5%", marginTop: "5px", color: "black", fontSize: 15, width: "50%" }} className="h5">Edit details</div>
            <MDBBtn onClick={() => setEdit(true)} outline color="primary m-3" style={{ height: '36px', overflow: 'visible' }}>
              Edit
            </MDBBtn>
            <div style={{ marginTop: "5px", color: "black", fontSize: 15 }} className="h5">
            </div>
          </motion.div>
        </div>
        <div className="card gedf-card" style={{ backgroundColor: "white", borderRadius: "20px", marginTop: "1rem", padding: "1rem" }}>
          <motion.div
            variants={fadeIn('right', 'tween', 0.3, 0.3)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "5%", cursor: "pointer", backgroundColor: "#C0C0C0", borderRadius: '10px' }}>
            <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
              {/* <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px", backgroundColor: "green" }} src={user?.imgSrc} alt="" /> */}
            </div>
            <div style={{ marginLeft: "5%", marginTop: "5px", color: "black", fontSize: 15, width: "50%" }} className="h5">Friends</div>
          </motion.div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex" }}>
              {friends.slice(0, 2).map((friend) => (
                <div class="card" style={{ width: "8rem", margin: "5px", borderRadius: "10%", cursor: "pointer" }}>
                  <div style={{ height: "70px", width: "100%", padding:"2px" }}>
                    <img src={friend.imgSrc} style={{ height: "100%", width: "100%", objectFit: "cover" }} class="card-img-top" alt="..." />
                  </div>                  
                  <div class="card-body">
                    <h6 style={{display:"flex", justifyContent:"center"}} class="card-title">{friend?.name}</h6>
                    <button style={{ border: 'none', width: "100%" }}><FaFacebookMessenger color="#0E3BBD" /></button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex" }}>
              {friends.slice(2, 4).map((friend) => (
                <div class="card" style={{ width: "8rem", margin: "5px", borderRadius: "10%", cursor: "pointer" }}>
                  <div style={{ height: "70px", width: "100%", padding:"2px" }}>
                    <img src={friend.imgSrc} style={{ height: "100%", width: "100%", objectFit: "cover" }} class="card-img-top" alt="..." />
                  </div>  
                  <div class="card-body">
                    <h6 class="card-title">{friend?.name}</h6>
                    <button style={{ border: 'none', width: "100%" }}><FaFacebookMessenger color="#0E3BBD" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
