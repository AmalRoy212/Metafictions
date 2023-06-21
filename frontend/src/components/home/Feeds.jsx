import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FaSafari } from "react-icons/fa";
import { zoomIn } from "../../utils/motions";
import Dropdown from 'react-bootstrap/Dropdown';
import { FaSteamSymbol } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setPopUp, setPostId } from "../../redux-toolkit/actionManagerSlice";
import PopUp from "../popUp/PopUp";
import '../../styles/styles.css';


export default function Feed({ posts }) {
  let delT;
  let dura;

  const popUp = useSelector((state) => state.post.popUp);

  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    dispatch(setPopUp());
    dispatch(setPostId(id))
  }

  return (
    <>
      {popUp && <PopUp message={"Are sure about the deletion ..!"} />}
      {posts?.map((post, index) => (<div key={index}>
        <motion.div variants={zoomIn(0.5, 0.5)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.24 }} className="gradient02" />
        {delT = (index + 1) % 2 === 0 ? 0.2 : 0}
        {dura = (index + 1) % 2 === 0 ? 0.2 : 0}
        <motion.div variants={zoomIn(delT, dura)} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.24 }} className="card gedf-card" style={{ marginTop: '-7rem', borderRadius: "20px", backgroundColor: 'white' }}>
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center" style={{ cursor: 'pointer' }}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="mr-2">
                  <img
                    className="rounded-circle"
                    width="50px"
                    height="50px"
                    src={post?.userDp}
                    alt="dp"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="ml-2">
                  <div className="h5 m-0 text-black m-1">{post?.userName}</div>
                </div>
              </div>
              <Dropdown>
                <Dropdown.Toggle variant="transperent" id="dropdown-basic">
                  <FaSteamSymbol />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => deleteHandler(post._id)} >Delete</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <div>
                <div className="dropdown">
                  <button
                    className="btn btn-link dropdown-toggle"
                    type="button"
                    id="gedf-drop1"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-ellipsis-h"></i>
                  </button>
                  <div
                    className="dropdown-menu dropdown-menu-right"
                    aria-labelledby="gedf-drop1"
                  >
                    <div className="h6 dropdown-header">Configuration</div>
                    <a className="dropdown-item" href="#">
                      Save
                    </a>
                    <a className="dropdown-item" href="#">
                      Hide
                    </a>
                    <a className="dropdown-item" href="#">
                      Report
                    </a>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          <div className="card-body">
            <div className="h7 text-black mb-2">
              {" "}
              <FaSafari /> <span style={{ fontSize: "small" }}> {post?.date}</span>
            </div>
            <a className="card-link" href="#">
              <h5 className="card-title">
                Lorem ipsum dolor sit amet, consectetur adip.
              </h5>
            </a>

            <p className="card-text text-black">
              {post?.discription}
            </p>
          </div>
          {post?.content && (
            <>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <img src={post?.content} alt="" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="card-footer">
            <a href="#" className="card-link">
              <i className="fa fa-gittip"></i> Like
            </a>
            <a href="#" className="card-link">
              <i className="fa fa-comment"></i> Comment
            </a>
            <a href="#" className="card-link">
              <i className="fa fa-mail-forward"></i> Share
            </a>
          </div>
        </motion.div>
      </div>))}
    </>
  );
}
