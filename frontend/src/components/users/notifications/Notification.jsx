import React, { useContext, useEffect, useState } from "react";
// import "./Main.css";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
} from "mdb-react-ui-kit";

export default function Notifications() {

  return (
    <>
      <div className="col-md-9 gedf-main" style={{ marginBottom: "10px",marginTop:"1rem",borderRadius: "20px", maxHeight:"88vh",overflow:"auto" }}>
        <div className="card gedf-card" style={{ backgroundColor: 'white', borderRadius: "20px" }}>
          <h3 style={{padding:"1rem"}}>Notifications</h3>
          <hr style={{margin:"1rem"}} />
          <MDBCard className="mb-3 m-3">
              <MDBCardBody>
                <div className="d-flex flex-start">
                  <MDBCardImage
                    className="rounded-circle shadow-1-strong me-3"
                    src="{comment?.userImage}"
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
                        here
                        {/* <div style={{width:"100%", padding:"1rem"}}>
                            horho
                        </div> */}
                        <span className="text-dark ms-2">
                          kjdhfksjhf
                        </span>
                      </MDBTypography>
                      <p style={{ fontSize: 'small' }} className="mb-0">iuewhieu</p>
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
