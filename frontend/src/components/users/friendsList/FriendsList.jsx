import React, { useContext, useEffect, useState } from "react";
import { FaSearch } from 'react-icons/fa'
import { useDispatch, useSelector } from "react-redux";
import { MDBInput, MDBCol } from "mdbreact";
import { Button } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";


export default function FriendsList({ data, posts }) {

  const [searchInput, setsearchInput] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth);

  const searchHandler = () => {
    console.log(searchInput);
  }

  useEffect(() => {

  })

  return (
    <>
      <div className="col-md-6 gedf-main" style={{ marginBottom: "10px",marginTop:"1rem",borderRadius: "20px", maxHeight:"88vh",overflow:"auto" }}>
        <div className="card gedf-card" style={{ backgroundColor: 'white', borderRadius: "20px" }}>
          <div style={{display:"flex", justifyContent:"center", height:"100px", paddingTop:"3rem"}}>
            <MDBCol md="6">
              <MDBInput 
                value={searchInput}
                onChange={(e) => setsearchInput(e.target.value)}
                hint="Search" type="text" containerClass="mt-0" 
              />
            </MDBCol>
            <Button style={{width:"50px", height:"37px", marginLeft:".5rem"}}
              onClick={searchHandler}
            >
              <FaSearch/>
            </Button>
          </div>
        </div>
        <div className="card gedf-card mt-2" style={{ backgroundColor: 'white', borderRadius: "20px" }}>
          <div style={{display:"flex", justifyContent:"center", paddingTop:"3rem"}}>
          <MDBTable>
            <MDBTableBody style={{display:"flex", justifyContent:"center"}}>
              <div 
                onClick={() => navigate(`/friends/profile/${null}/`)}
                style={{backgroundColor:"#D9D9D9", width:"90%",height:"70px", borderRadius:"20px", padding:"5px", color:"white", display:"flex", cursor:"pointer"}}>
                <div style={{height:"100%", width:"60px", borderRadius:"50%"}}>
                  <img src="" alt="Dp" />
                </div>
                <div style={{display:"flex", alignItems:"center", background:"none", color:"black", width:"50%"}}>
                  <h5>username</h5>
                </div>
              </div>
            </MDBTableBody>
          </MDBTable>
          </div>
        </div>
      </div>
    </>
  );
}
