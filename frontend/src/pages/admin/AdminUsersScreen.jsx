import React, { useEffect } from "react";
import AdminHeader from "../../components/admin/header/AdminHeader";
import Leftsidebar from "../../components/admin/home/LeftsideBar";
import UsersTable from "../../components/admin/usersTable/UsersTable";
import { useNavigate } from "react-router-dom";

export default function AminUsersScreen() { 
  
  const navigate = useNavigate();

  const  adminToken  = localStorage.getItem('adminToken') ? localStorage.getItem('adminToken') : null ;

  useEffect(() => {
    if(!adminToken){
      navigate('/admin');
    }
  })

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
