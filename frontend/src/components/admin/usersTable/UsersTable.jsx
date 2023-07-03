import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Row } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { blockUser, deleteUser, fetchCurrentUsers, findSearchData, unblockUser } from "../../../functionalities/AdminUsersApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MDBInput, MDBCol } from "mdbreact";
import { FaSearch } from "react-icons/fa";


export default function UsersTable() {

  const [searchData, setSearchData] = useState('');
  const [users, setUsers] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  let { adminToken } = useSelector((state) => state.admin);
  adminToken ? adminToken : localStorage.getItem('adminToken')

  const blockHandler = (_id) => {
    blockUser({ _id, adminToken });
  }

  const unblockHandler = (_id) => {
    unblockUser({ _id, adminToken });
  }

  const deleteHandler = (_id) => {
    deleteUser({ _id, adminToken })
  }

  useEffect(() => {
    findSearchData({ adminToken, setUsers, searchData });
  }, [searchData, adminToken, users]);

  // useEffect(() => {
  //   fetchCurrentUsers({ adminToken, setUsers, searchData });
  // }, [users, adminToken]);

  return (
    <>
      <div className="col-md-9 gedf-main" style={{ marginBottom: "10px", marginTop: "1rem", borderRadius: "20px", maxHeight: "100vh", paddingTop: "5rem" }}>
        <div className="card gedf-card" style={{ backgroundColor: 'white', borderRadius: "20px", overflow: "auto" }}>
          <div style={{ display: "flex", justifyContent: "center", height: "100px", paddingTop: "3rem" }}>
            <MDBCol md="6">
              <MDBInput
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
                hint="Search" type="text" containerClass="mt-0"
              />
            </MDBCol>
            <Button style={{ width: "50px", height: "37px", marginLeft: ".5rem" }}
            >
              <FaSearch />
            </Button>
          </div>
          <Row className="p-5">
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Image</th>
                  <th scope='col'>Name</th>
                  <th scope='col'>Email</th>
                  <th scope='col'> <span style={{ marginLeft: "20%" }}></span> Block</th>
                  {/* <th scope='col'> <span style={{ marginLeft: "20%" }}></span> Edit</th> */}
                  <th scope='col'> <span style={{ marginLeft: "20%" }}></span> Delete</th>
                </tr>
              </MDBTableHead>
              {users && <>
                {users?.map((user, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope='row'>{index + 1}</th>
                      <td>{<img alt='' src={user?.imgSrc} style={{ objectFit: 'cover', border: '2px solid black', borderRadius: '50%' }} width="30px" height="30px"></img>}</td>
                      <td>{user?.name}</td>
                      <td>{user?.email}</td>
                      {user.isBlocked ? (<td style={{ width: "100px" }}>
                        <Button variant='primary' style={{ width: "100px", height: "30px", fontSize: "small" }}
                          onClick={() => {
                            unblockHandler(user._id);
                          }}
                        >Unblock</Button>
                      </td>)
                        :
                        (<td style={{ width: "100px" }}>
                          <Button variant='warning' style={{ width: "100px", height: "30px", fontSize: "small" }}
                            onClick={() => {
                              blockHandler(user._id);
                              setIsBlocked(true);
                            }}
                          >Block</Button>
                        </td>)}
                      {user.isDeleted ? (<td style={{ width: "100px" }}>
                        <Button onClick={() => deleteHandler(user._id)}
                          variant='info' style={{ width: "100px", height: "30px", fontSize: "small" }}
                        >Reset</Button>
                      </td>
                      )
                        :
                        (<td style={{ width: "100px" }}>
                          <Button onClick={() => deleteHandler(user._id)}
                            variant='danger' style={{ width: "100px", height: "30px", fontSize: "small" }}
                          >Delete</Button>
                        </td>
                        )}
                    </tr>
                  </MDBTableBody>
                ))}
              </>}
            </MDBTable>
          </Row>
        </div>
      </div>
    </>
  );
}
