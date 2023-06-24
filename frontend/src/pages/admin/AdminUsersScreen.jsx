import React from "react";
import AdminHeader from "../../components/admin/header/AdminHeader";
// import "./styles.css";
import Leftsidebar from "../../components/admin/home/LeftsideBar";
import UsersTable from "../../components/admin/usersTable/UsersTable";
import { MDBCol } from "mdbreact";
import { Button } from "react-bootstrap";


export default function AminUsersScreen() {
  const submitHandler = async function (e) {
    e.preventDefault();
  }
  return (
    <>
      <AdminHeader />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MDBCol md="6">
          <div className="input-group md-form form-sm form-1 pl-0">
            <input
              style={{ margin: '1rem' }}
              className="form-control my-0 py-1"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </MDBCol>
        <Button  style={{ margin: '1rem' }} variant='primary' className='mt-3'>
          Search
        </Button>
      </div>
      <div className="container-fluid gedf-wrapper bg-white" style={{height:"80vh"}}>
        <div className="row">
          <Leftsidebar/>
          <UsersTable/>
        </div>
      </div>
    </>
  );
}
