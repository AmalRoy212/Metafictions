import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBIcon,
  MDBSwitch,
  MDBTypography,
} from "mdb-react-ui-kit";
import { createComment, deleteComment } from "../../functionalities/commentApi";
import { useDispatch, useSelector } from "react-redux";
import { incrementPostCount } from "../../redux-toolkit/actionManagerSlice";
import { FaReply, FaTrashAlt, FaRegThumbsUp } from "react-icons/fa";

export default function CommentBox({ data, postId }) {

  const [comment, setComment] = useState('');
  const [onOff, setOnOff] = useState(true);

  const { token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const commentHandler = () => {
    createComment({
      postId,
      content: comment,
      token
    });
    dispatch(incrementPostCount());
    setComment('')
  }

  const removeHandler = (commentId) => {
    deleteComment({ commentId, token, postId });
    dispatch(incrementPostCount());
  }

  const handleComment = (status) => {
    status ? setOnOff(false) : setOnOff(true);
  }

  return (
    <>
      <div style={{ width: "100%", backgroundColor: "white", borderRadius: "20px", }}>
        <div style={{ display: "flex", padding: "2%" }}>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} style={{ width: "80%", height: "50px", borderRadius: "20px", padding: "10px" }} placeholder="Comment" cols="30" rows="10"></textarea>
          <Button onClick={commentHandler} style={{ marginLeft: "5px", borderRadius: "20px" }}>Comment</Button>
        </div>
        <MDBCard>
          <MDBCardBody className="p-2 d-flex align-items-center" onClick={() => handleComment(onOff)}>
            <MDBTypography
              tag="h6"
              className={`text-primary fw-bold small mb-0 me-1 ${onOff ? 'active' : ''}`}
            >
              Comments {onOff ? 'ON' : 'OFF'}
            </MDBTypography>
            <MDBSwitch defaultChecked id="flexSwitchCheckChecked" />
          </MDBCardBody>
        </MDBCard>
        {/* data.length && */}
        {onOff && <div style={{ maxHeight: "300px", width: "100%", overflowY: "auto" }}>
          {data.map((comment, index) => (<div key={index} style={{ margin: "3%", backgroundColor: "#D5D5D5", borderRadius: "20px", width: "94%", boxShadow: " 0px 0px 10px 2px rgba(0, 0, 0, 0.5)" }}>
            <MDBCard className="mb-3">
              <MDBCardBody>
                <div className="d-flex flex-start">
                  <MDBCardImage
                    className="rounded-circle shadow-1-strong me-3"
                    src={comment?.userImage}
                    alt="avatar"
                    width="40"
                    height="40"
                    style={{ objectFit: "cover" }}
                  />

                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <MDBTypography
                        tag="h6"
                        className="text-primary fw-bold mb-0"
                      >
                        {comment?.userName}
                        <div style={{width:"100%", padding:"1rem"}}>

                        </div>
                        <span className="text-dark ms-2">
                          {comment?.content}
                        </span>
                      </MDBTypography>
                      <p style={{ fontSize: 'small' }} className="mb-0">{comment?.time}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="small mb-0" style={{ color: "#aaa" }}>
                        {comment.canDelete && <>
                            <a style={{ cursor: "pointer" }} onClick={() => removeHandler(comment._id)} className="link-grey">
                            <FaTrashAlt />
                            </a>{" "}
                            •
                          </>
                        }
                        {/* <a href="#!" className="link-grey">
                          Reply 
                        </a>{" "}
                          <FaReply style={{color:"#2779E9 "}} />
                        • */}
                        {/* <a href="#!" className="link-grey">
                          Translate
                        </a> */}
                      </p>
                      <div className="d-flex flex-row">
                        <MDBIcon fas icon="star text-warning me-2" />
                        <MDBIcon
                          far
                          icon="check-circle"
                          style={{ color: "#aaa" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          </div>))}
        </div>}
      </div>
    </>
  );
}