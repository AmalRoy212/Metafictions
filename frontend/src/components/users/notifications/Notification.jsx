import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBBadge
} from "mdb-react-ui-kit";
import { findMyNots } from "../../../functionalities/userApiFunctionalities";

export default function Notifications() {

  const [notifications, setNotifications] = useState([]);

  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);
  const { notiLenght } = useSelector((state) => state.notification);

  const diffOfNot = notiLenght - notifications.length;

  useEffect(() => {
    findMyNots({ token, setNotifications, dispatch });
  }, [token])

  return (
    <>
      <div className="col-md-9 gedf-main" style={{ marginBottom: "10px", marginTop: "1rem", borderRadius: "20px", maxHeight: "88vh", overflow: "auto" }}>
        <div className="card gedf-card" style={{ backgroundColor: 'white', borderRadius: "20px" }}>
          <div style={{display:"flex", alignItems:"center" }}>
            <h3 style={{marginLeft:"1rem",marginTop:"5px"}}>Notifications</h3>
            <h5 style={{marginTop:"7px"}}>
              <MDBBadge className='ms-1' color='danger'>
                {diffOfNot}
              </MDBBadge>
            </h5>
          </div>
          <hr style={{ margin: "1rem" }} />
          {notifications?.map((notification, index) => (
            <MDBCard key={index} className="mb-3 m-3">
              <MDBCardBody>
                <div className="d-flex flex-start">
                  <MDBCardImage
                    className="rounded-circle shadow-1-strong me-3"
                    src={notification?.LikedUserDp}
                    alt="avatar"
                    width="40"
                    height="40"
                    style={{ objectFit: "cover" }}
                  />

                  <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <MDBTypography
                        tag="h6"
                        className="text-primary fw-bold mb-0 mt-2"
                      >
                        {/* <div style={{width:"100%", padding:"1rem"}}>
                          horho
                      </div> */}
                        <span className="text-dark ms-2">
                          {notification?.noteMessage}
                        </span>
                      </MDBTypography>
                      <p style={{ fontSize: 'small' }} className="mb-0">{notification?.date}</p>
                    </div>
                  </div>
                </div>
              </MDBCardBody>
            </MDBCard>
          ))}
        </div>
      </div>
    </>
  );
}
