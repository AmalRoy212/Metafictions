import React from "react";
import Button from 'react-bootstrap/Button';
import { Row } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { blockUser, deleteUser, findAllUsers, unblockUser } from "../../../functionalities/AdminUsersApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UsersTable({ users, setUsers }) {

  const { adminToken } = useSelector((state) => state.admin);

  const navigate = useNavigate();

  // findAllUsers({adminToken});

  const blockHandler = (_id) => {
    blockUser({ _id, adminToken });
  }

  const unblockHandler = (_id) => {
    unblockUser({ _id, adminToken });
  }

  const deleteHandler = (_id) => {
    deleteUser({ _id, adminToken })
  }

  return (
    <>
      <div className="col-md-9 gedf-main" style={{ overflow: 'auto', maxHeight: '100vh' }}>
        <Row className="p-5" >
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
            {users?.map((user, index) => (
              <MDBTableBody key={index}>
                <tr>
                  <th scope='row'>{index + 1}</th>
                  <td>{<img alt='' src={user?.imgSrc} style={{ objectFit: 'cover', border: '2px solid black', borderRadius: '50%' }} width="30px" height="30px"></img>}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  {user.isBlocked ? (<td style={{ width: "100px" }}>
                    <Button variant='primary' style={{ width: "100px", height: "30px", fontSize: "small" }}
                      onClick={() => unblockHandler(user._id)}
                    >Unblock</Button>
                  </td>)
                    :
                    (<td style={{ width: "100px" }}>
                      <Button variant='warning' style={{ width: "100px", height: "30px", fontSize: "small" }}
                        onClick={() => blockHandler(user._id)}
                      >Block</Button>
                    </td>)}
                  {/* <td style={{ width: "100px" }}>
                    <Button onClick={() => navigate('/admin/edit/user')}
                    variant='success' style={{ width: "100px", height: "30px", fontSize: "small" }}
                    >Edit</Button>
                  </td> */}
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
                  {/* <td style={{ width: "100px" }}>
                    <Button onClick={() => deleteHandler(user._id)}
                      variant='danger' style={{ width: "100px", height: "30px", fontSize: "small" }}
                    >Delete</Button>
                  </td> */}
                </tr>
                {/* <tr>
                <th scope='row'>2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope='row'>3</th>
                <td colSpan={2}>Larry the Bird</td>
                <td>@twitter</td>
              </tr> */}
              </MDBTableBody>
            ))}
          </MDBTable>
        </Row>
      </div>
    </>
  );
}
