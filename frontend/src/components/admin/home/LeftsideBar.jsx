import React from "react";
import { FaHSquare, FaEdit, FaWindowRestore, FaChalkboardTeacher } from "react-icons/fa"
import '../../../styles/styles.css';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"


export default function Leftsidebar({ data }) {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  return (
    <>
      <div className="col-md-3" style={{ marginBottom: '1rem', marginTop: "1rem", paddingTop: "5rem" }}>
        <div className="card" style={{ backgroundColor: "white ", borderRadius: "20px" }}>
          <div className="card-body">
            <div>
            </div>
            <div
              onClick={() => {
                navigate('/admin/home')
              }}
              style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "5%", cursor: "pointer", border:"2px solid grey", borderRadius:"10px" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaHSquare style={{ width: "100%", height: "100%", objectFit: "cover", marginLeft: "3px" }} src={data?.imgSrc} alt="" />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "black", fontSize: 15 }} className="h5">Home</div>
            </div>
            <div
              onClick={() => {
                navigate('/admin/users')
              }}
              style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "2%", cursor: "pointer", border:"2px solid grey", borderRadius:"10px" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaChalkboardTeacher style={{ width: "100%", height: "100%", objectFit: "cover", marginLeft: "3px" }} src={data?.imgSrc} />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "black", fontSize: 15 }} className="h5">User Management</div>
            </div>
            <div
              onClick={() => navigate('/admin/posts')}
              style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "2%", cursor: "pointer", border:"2px solid grey", borderRadius:"10px" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaEdit style={{ width: "100%", height: "100%", objectFit: "cover", marginLeft: "3px" }} src={data?.imgSrc} />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "black", fontSize: 15 }} className="h5">Post Management</div>
            </div>
            <div
              onClick={() => navigate('/admin/comments')}
              style={{ display: 'flex', alignItems: "center", padding: "5px", marginTop: "2%", cursor: "pointer", border:"2px solid grey", borderRadius:"10px" }}>
              <div style={{ height: "30px", width: "30px", borderRadius: "50%" }}>
                <FaWindowRestore style={{ width: "100%", height: "100%", objectFit: "cover", marginLeft: "3px" }} src={data?.imgSrc} />
              </div>
              <div style={{ marginLeft: "10%", marginTop: "5px", color: "black", fontSize: 15 }} className="h5">Comments Management</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
