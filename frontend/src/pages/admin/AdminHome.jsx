import React from "react";
import AdminHeader from "../../components/admin/header/AdminHeader";
// import "./styles.css";
import Maincontent from "../../components/admin/home/MainContainer";
import Leftsidebar from "../../components/admin/home/LeftsideBar";

export default function AdminHome() {
  return (
    <>
      <AdminHeader />
      <div className="container-fluid gedf-wrapper" style={{height:"110vh", backgroundColor:'#D9D9D9'}}>
        <div className="row">
          <Leftsidebar/>
          <Maincontent/>
        </div>
      </div>
    </>
  );
}
