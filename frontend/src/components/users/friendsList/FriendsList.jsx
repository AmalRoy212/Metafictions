import React, { useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa'
import { useSelector } from "react-redux";
import { MDBInput, MDBCol } from "mdbreact";
import { Button } from "react-bootstrap";
import { MDBTable, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { findMyFriendsList } from "../../../functionalities/userApiFunctionalities";


export default function FriendsList({ data, posts }) {

  const [searchInput, setsearchInput] = useState('');
  const [users, setUsers] = useState([]);

  const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth);


  const searchHandler = () => {
  }

  useEffect(() => {
    findMyFriendsList({ token, searchInput, setUsers })
  }, [token, searchInput])

  return (
    <>
      <div className="col-md-6 gedf-main" style={{ marginBottom: "10px", marginTop: "1rem", borderRadius: "20px", maxHeight: "88vh", overflow: "auto" }}>
        <div className="card gedf-card" style={{ backgroundColor: 'white', borderRadius: "20px" }}>
          <div style={{ display: "flex", justifyContent: "center", height: "100px", paddingTop: "3rem" }}>
            <MDBCol md="6">
              <MDBInput
                value={searchInput}
                onChange={(e) => setsearchInput(e.target.value)}
                hint="Search" type="text" containerClass="mt-0"
              />
            </MDBCol>
            <Button style={{ width: "50px", height: "37px", marginLeft: ".5rem" }}
              onClick={searchHandler}
            >
              <FaSearch />
            </Button>
          </div>
        </div>
        <div className="card gedf-card mt-2" style={{ backgroundColor: 'white', borderRadius: "20px" }}>
          <div style={{ display: "flex", justifyContent: "center", paddingTop: "3rem" }}>
            <MDBTable>
              <MDBTableBody style={{ display: "flex", justifyContent: "center", alignItems:"center", flexDirection:"column" }}>
              {users?.map((user,index) =>(
                <div
                  key={index}
                  onClick={() => navigate(`/friends/profile/${user?._id}/`)}
                  style={{ marginTop:"10px", backgroundColor: "#D9D9D9", width: "90%", height: "70px", borderRadius: "20px", padding: "5px", color: "white", display: "flex", cursor: "pointer" }}>
                  <div className="bg-dark" style={{ height: "60px", width: "60px", borderRadius: "50%" }}>
                    <img style={{height:"100%", width:"100%", borderRadius: "50%", objectFit:"cover"}} src={user?.imgSrc} alt="Dp" />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", background: "none", color: "black", width: "50%" }}>
                    <h5>{user?.name}</h5>
                  </div>
                </div>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
      </div>
    </>
  );
}
