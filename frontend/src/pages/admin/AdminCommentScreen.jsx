import React from "react";
import AdminHeader from "../../components/admin/header/AdminHeader";
import Leftsidebar from "../../components/admin/home/LeftsideBar";
import CommentTable from "../../components/admin/commentTable/CommentTable";

export default function AdminCommentScreen() {
  return (
    <>
      <AdminHeader />
      <div className="container-fluid gedf-wrapper" style={{height:"110vh", backgroundColor:'#D9D9D9'}}>
        <div className="row">
          <Leftsidebar/>
          <CommentTable/>
        </div>
      </div>
    </>
  );
}
