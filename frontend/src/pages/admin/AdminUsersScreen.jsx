import React from "react";
import AdminHeader from "../../components/admin/header/AdminHeader";
// import "./styles.css";
import Leftsidebar from "../../components/admin/home/LeftsideBar";
import UsersTable from "../../components/admin/usersTable/UsersTable";

export default function AminUsersScreen() {
  return (
    <>
      <AdminHeader />
      <div className="container-fluid gedf-wrapper bg-white" style={{height:"80vh"}}>
        <div className="row">
          <Leftsidebar/>
          <UsersTable/>
        </div>
      </div>
    </>
  );
}
