import React from "react";
import { motion } from "framer-motion"
import { FaSafari } from "react-icons/fa"
import { zoomIn } from "../../utils/motions"
import '../../styles/styles.css'


export default function Feed({ posts }) {
  return (
    <>
      {posts?.map((post, index) => (<div key={index}>
        <motion.div variants={zoomIn(0.5,.06)} className="gradient02" />
        <div className="card gedf-card" style={{ marginTop: '-4rem' }}>
          <div className="card-header">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex justify-content-between align-items-center">
                <div className="mr-2">
                  <img
                    className="rounded-circle"
                    width="50px"
                    height="50px"
                    src={post?.userDp}
                    alt="dp"
                    style={{objectFit:"cover"}}
                  />
                </div>
                <div className="ml-2">
                  <div className="h5 m-0 text-white m-1">@{post?.userName}</div>
                </div>
              </div>
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
            <div className="h7 mb-2" style={{color:"white"}}>
              {" "}
              <FaSafari /> <span style={{fontSize:"small"}}> {post?.date}</span>
            </div>
            {/* <a className="card-link" href="#">
              <h5 className="card-title">
                Lorem ipsum dolor sit amet, consectetur adip.
              </h5>
            </a> */}

            <p className="card-text text-white">
              {post?.discription}
            </p>
          </div>
          {post?.content && (
            <>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <img src={post?.content} alt="" style={{height:"100%",width:"100%",objectFit:"cover"}}/>
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
        </div>
      </div>))}
    </>
  );
}
