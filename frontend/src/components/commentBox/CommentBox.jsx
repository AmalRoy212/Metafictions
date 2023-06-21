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
import { createComment } from "../../functionalities/userApiFunctionalities";

export default function CommentBox(allComments) {

  const [commet,setCommet] = useState('');

 const commentHandler = async () => {
  await createComment();
 }

  return (
    <>
      <div style={{ width: "100%", backgroundColor: "white", height: "300px", borderRadius: "20px" }}>
        <div style={{ display: "flex", padding: "2%" }}>
          <textarea value={commet} onChange={(e) => setCommet(e.target.value)} style={{ width: "80%", height: "50px", borderRadius: "20px", padding: "10px" }} placeholder="Comment" cols="30" rows="10"></textarea>
          <Button onClick={commentHandler} style={{ marginLeft: "5px", borderRadius: "20px" }}>Comment</Button>
        </div>
        <MDBCard>
          <MDBCardBody className="p-2 d-flex align-items-center">
            <MDBTypography
              tag="h6"
              className="text-primary fw-bold small mb-0 me-1"
            >
              Comments "ON"
            </MDBTypography>
            <MDBSwitch defaultChecked id="flexSwitchCheckChecked" />
          </MDBCardBody>
        </MDBCard>

        <div style={{ margin: "3%", backgroundColor: "#D5D5D5", borderRadius: "20px", width: "94%", boxShadow: " 0px 0px 10px 2px rgba(0, 0, 0, 0.5)" }}>
        <MDBCard className="mb-3">
              <MDBCardBody>
                <div className="d-flex flex-start">
                  <MDBCardImage
                    className="rounded-circle shadow-1-strong me-3"
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                    alt="avatar"
                    width="40"
                    height="40"
                  />

                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <MDBTypography
                        tag="h6"
                        className="text-primary fw-bold mb-0"
                      >
                        lara_stewart
                        <span className="text-dark ms-2">
                          Hmm, This poster looks cool
                        </span>
                      </MDBTypography>
                      <p className="mb-0">2 days ago</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="small mb-0" style={{ color: "#aaa" }}>
                        <a href="#!" className="link-grey">
                          Remove
                        </a>{" "}
                        •
                        <a href="#!" className="link-grey">
                          Reply
                        </a>{" "}
                        •
                        <a href="#!" className="link-grey">
                          Translate
                        </a>
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
        </div>
      </div>
    </>
  );
}