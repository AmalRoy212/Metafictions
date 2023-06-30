import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/motions";
import { useDispatch, useSelector } from "react-redux";
import { FaNutritionix, FaMailchimp, FaMandalorian, FaTelegram, FaBomb } from "react-icons/fa"
import UpdateUser from '../userUpdate/UpdateUser';
import {  MDBBtn } from 'mdb-react-ui-kit';


export default function ProfileRightSide({ data }) {
  
  const [edit, setEdit] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {

  })

  return (
    <>
      {edit && <UpdateUser data={data} setEdit={setEdit}/>}
      <div className="col-md-3">
        <div className="card gedf-card" style={{ backgroundColor: "white", borderRadius: "20px", marginTop: "1rem", padding:"1rem" }}>
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
        <div className="card gedf-card" style={{ backgroundColor: "white", borderRadius: "20px", marginTop: "1rem", padding:"1rem" }}>
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
        </div>
      </div>
    </>
  );
}
