import React from "react";
import { motion } from "framer-motion";
import { fadeIn, zoomIn } from "../../utils/motions"
import { FaNutritionix, FaMailchimp, FaMandalorian, FaTelegram, FaBomb } from "react-icons/fa"
import '../../styles/styles.css';
import { Button } from "react-bootstrap";
import { userLogOut } from "../../functionalities/userApiFunctionalities";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { setFollowDetails } from "../../redux-toolkit/actionManagerSlice";
import { MDBBadge } from "mdb-react-ui-kit";


export default function Leftsidebar({ data }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    await userLogOut({ token, dispatch, navigate });
  }

  return (
    <>
      <div className="col-md-3" style={{ marginBottom:'1rem',marginTop:"1rem"}}>
        <div className="card" style={{backgroundColor:"white ", borderRadius:"20px"}}>
          <div className="card-body">
            <motion.div
              variants={zoomIn(0.5,0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once:false , amount:0.25 }}
             style={{backgroundColor: '#E5E5E5 ', borderRadius: '10px', padding: "5px"}}>
              <div style={{ display: 'flex', alignItems: "center",justifyContent:"center",borderRadius: '10px', padding: "3px" }}>
                <div style={{ height: "150px", width: "150px", borderRadius: "50%"}}>
                  <img style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%"}} src={data?.imgSrc} alt="" />
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: "center",justifyContent:"center", borderRadius: '10px', padding: "3px" }}>
                <div style={{ color:"black", marginTop: "5px" }} className="h5">{data?.name}</div>
              </div>
              <div onClick={() => dispatch(setFollowDetails())} style={{ cursor:"pointer", display: 'flex', alignItems: "center", borderRadius: '10px', padding: "3px" }}>
                <h6 style={{ color:"black", width: "50%", display: 'flex', alignItems: "center",justifyContent:'center',marginTop:'1rem'}}>Followers</h6>
                <h6 style={{ color:"black", width: "50%", display: 'flex', alignItems: "center",justifyContent:'center',marginTop:'1rem'}}>Following</h6>
              </div>
              <div onClick={() => dispatch(setFollowDetails())} style={{ cursor:"pointer", display: 'flex', alignItems: "center", borderRadius: '10px', padding: "3px" }}>
                <h4 style={{ color:"black", width: "50%", display: 'flex', alignItems: "center",justifyContent:'center'}}>{data?.followers}</h4>
                <h4 style={{ color:"black", width: "50%", display: 'flex', alignItems: "center",justifyContent:'center'}}>{data?.following}</h4>
              </div>
              <div style={{ display: 'flex', alignItems: "center",justifyContent:"center", borderRadius: '10px', marginBottom:"10px"}}>
                <Button onClick={(e) => submitHandler(e)} className="btn-primary">Log Out</Button>
              </div>

            </motion.div>
            <div>
            </div>
            <motion.div
              onClick={() => {
                navigate('/home')
              }}
              variants={fadeIn('right', 'tween', 0.3, 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "5%", cursor: "pointer",  }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaNutritionix style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px" }} src={data?.imgSrc} alt="" />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "black", fontSize: 15 }} className="h5">Feeds</div>
            </motion.div>
            <motion.div
              onClick={() => {
                navigate('/profile')
              }}
              variants={fadeIn('right', 'tween', 0.3, 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "2%", cursor: "pointer",}}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaMailchimp style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px" }} src={data?.imgSrc} />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "black", fontSize: 15 }} className="h5">Profile</div>
            </motion.div>
            <motion.div
              variants={fadeIn('right', 'tween', 0.3, 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "2%", cursor: "pointer" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaTelegram style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px" }} src={data?.imgSrc} />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "black", fontSize: 15 }} className="h5">Inbox</div>
            </motion.div>
            <motion.div
              onClick={() => navigate('/notifications')}
              variants={fadeIn('right', 'tween', 0.3, 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "2%", cursor: "pointer" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaBomb style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px" }} src={data?.imgSrc} />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "black", fontSize: 15 }} className="h5">
                Notifications
                <MDBBadge className='ms-1' color='danger'>
                  #
                </MDBBadge>
              </div>
            </motion.div>
            <motion.div
              onClick={() => navigate('/friends/list')}
              variants={fadeIn('right', 'tween', 0.3, 0.3)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.25 }}
              style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "2%", cursor: "pointer" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaMandalorian style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%", marginLeft: "3px" }} src={data?.imgSrc}/>
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "black", fontSize: 15 }} className="h5">Friends</div>
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
