import React from "react";
import AdminHeader from "../../components/admin/header/AdminHeader";
import Leftsidebar from "../../components/admin/home/LeftsideBar";
import UsersTable from "../../components/admin/usersTable/UsersTable";

export default function AminUsersScreen() {  

  return (
    <>
      <AdminHeader />
      <div className="container-fluid gedf-wrapper" style={{height:"100vh", backgroundColor:"#D9D9D9"}}>
        <div className="row">
          <Leftsidebar/>
          <UsersTable/>
        </div>
      </div>
    </>
  );
}
