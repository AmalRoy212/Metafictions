import React, { useEffect, useState } from "react";
import AdminHeader from "../../components/admin/header/AdminHeader";
// import "./styles.css";
import Leftsidebar from "../../components/admin/home/LeftsideBar";
import UsersTable from "../../components/admin/usersTable/UsersTable";
import { MDBCol } from "mdbreact";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { findSearchData, findUserOnSubmit } from "../../functionalities/AdminUsersApi";


export default function AminUsersScreen() {  

  const [ searchData, setSearchData ] = useState('');
  const [ users, setUsers ] = useState();

  let { adminToken } = useSelector((state) => state.admin);
  adminToken ? adminToken : localStorage.getItem("adminToken");

  useEffect(() => {
    findSearchData({adminToken,setUsers,searchData})
  },[searchData,users,adminToken]);
  // console.log(users,searchData,"***");

  const searchHandler = () => {
    findUserOnSubmit({searchData,adminToken,setUsers});
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
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
            />
          </div>
        </MDBCol>
        <Button onClick={searchHandler} style={{ margin: '1rem' }} variant='primary' className='mt-3'>
          Search
        </Button>
      </div>
      <div className="container-fluid gedf-wrapper bg-white" style={{height:"80vh"}}>
        <div className="row">
          <Leftsidebar/>
          <UsersTable users={users} setUsers={setUsers}/>
        </div>
      </div>
    </>
  );
}
