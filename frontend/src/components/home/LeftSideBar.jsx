import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motions"
import { FaNutritionix, FaMailchimp, FaMandalorian, FaTelegram, FaBomb } from "react-icons/fa"
import '../../styles/styles.css';


export default function Leftsidebar({ data }) {
  return (
    <>
      <div className="col-md-3" style={{ marginTop: "3rem" }}>
        <div className="card">
          <div className="card-body">
            <div style={{backgroundColor: 'grey', borderRadius: '10px', padding: "5px"}}>
              <div style={{ display: 'flex', alignItems: "center", backgroundColor: 'grey', borderRadius: '10px', padding: "5px" }}>
                <div style={{ height: "50px", width: "50px", borderRadius: "50%" }}>
                  <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px" }} src={data?.imgSrc} alt="" />
                </div>
                <div style={{ marginLeft: "10%", marginTop: "5px" }} className="h5">{data?.name}</div>
              </div>
              <div style={{ display: 'flex', alignItems: "center", backgroundColor: 'grey', borderRadius: '10px', padding: "5px" }}>
                <h6 style={{  width: "50%", display: 'flex', alignItems: "center",justifyContent:'center',marginTop:'1rem'}}>Followers</h6>
                <h6 style={{  width: "50%", display: 'flex', alignItems: "center",justifyContent:'center',marginTop:'1rem'}}>following</h6>
              </div>
              <div style={{ display: 'flex', alignItems: "center", backgroundColor: 'grey', borderRadius: '10px', padding: "5px" }}>
                <h4 style={{  width: "50%", display: 'flex', alignItems: "center",justifyContent:'center'}}>{data?.followers}</h4>
                <h4 style={{  width: "50%", display: 'flex', alignItems: "center",justifyContent:'center'}}>{data?.following}</h4>
              </div>
            </div>
            <div>
            </div>
            <motion.div
              variants={fadeIn('right', 'tween', 0.5, 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              style={{ display: 'flex', alignItems: "center", backgroundColor: 'grey', borderRadius: '10px', padding: "5px", marginTop: "5%", cursor: "pointer" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaNutritionix style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px" }} src={data?.imgSrc} alt="" />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "white", fontSize: 15 }} className="h5">Feeds</div>
            </motion.div>
            <motion.div
              variants={fadeIn('right', 'tween', 0.5, 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              style={{ display: 'flex', alignItems: "center", backgroundColor: 'grey', borderRadius: '10px', padding: "5px", marginTop: "2%", cursor: "pointer" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaMailchimp style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px" }} src={data?.imgSrc} alt="" />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "white", fontSize: 15 }} className="h5">Profile</div>
            </motion.div>
            <motion.div
              variants={fadeIn('right', 'tween', 0.5, 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              style={{ display: 'flex', alignItems: "center", backgroundColor: 'grey', borderRadius: '10px', padding: "5px", marginTop: "2%", cursor: "pointer" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaTelegram style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px" }} src={data?.imgSrc} alt="" />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "white", fontSize: 15 }} className="h5">Inbox</div>
            </motion.div>
            <motion.div
              variants={fadeIn('right', 'tween', 0.5, 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              style={{ display: 'flex', alignItems: "center", backgroundColor: 'grey', borderRadius: '10px', padding: "5px", marginTop: "2%", cursor: "pointer" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaBomb style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px" }} src={data?.imgSrc} alt="" />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "white", fontSize: 15 }} className="h5">Notifications</div>
            </motion.div>
            <motion.div
              variants={fadeIn('right', 'tween', 0.5, 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              style={{ display: 'flex', alignItems: "center", backgroundColor: 'grey', borderRadius: '10px', padding: "5px", marginTop: "2%", cursor: "pointer" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaMandalorian style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px" }} src={data?.imgSrc} alt="" />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "white", fontSize: 15 }} className="h5">Friends</div>
            </motion.div>
          </div>
          {/* <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <div className="h6 text-muted">Followers</div>
              <div className="h5">5.2342</div>
            </li>
            <li className="list-group-item">
              <div className="h6 text-muted">Following</div>
              <div className="h5">6758</div>
            </li>
            <li className="list-group-item">Vestibulum at eros</li>
          </ul> */}
        </div>
      </div>
    </>
  );
}
