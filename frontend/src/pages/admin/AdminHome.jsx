import React from "react";
import AdminHeader from "../../components/admin/header/AdminHeader";
import "./styles.css";
import Maincontent from "../../components/admin/home/MainContainer";
import Leftsidebar from "../../components/admin/home/LeftsideBar";

export default function App() {
  return (
    <>
      <AdminHeader />
      <div className="container-fluid gedf-wrapper bg-white" style={{height:"80vh"}}>
        <div className="row">
          <Leftsidebar />
          <Maincontent />
        </div>
      </div>
    </>
  );
}
