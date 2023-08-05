import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Row } from "react-bootstrap";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {  deletePost, fetchAllPost } from "../../../functionalities/AdminUsersApi";
import { useSelector } from "react-redux";


export default function PostTable() {

  const [searchInput, setSearchInput] = useState('');
  const [posts, setPosts] = useState([]);

  let { adminToken } = useSelector((state) => state.admin);
  adminToken ? adminToken : localStorage.getItem('adminToken')

  const deleteHandler = (_id) => {
    deletePost({adminToken, _id});
  }

  useEffect(() => {
    fetchAllPost({adminToken,searchInput,setPosts});
  }, [ adminToken, posts]);

  return (
    <>
      <div className="col-md-9 gedf-main" style={{ marginBottom: "10px", marginTop: "1rem", borderRadius: "20px", maxHeight: "100vh", paddingTop: "5rem" }}>
        <div className="card gedf-card" style={{ backgroundColor: 'white', borderRadius: "20px", overflow: "auto" }}>
          <Row className="p-5" style={{ maxHeight: "80vh", overflow: "auto" }}>
            <MDBTable>
              <MDBTableHead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>Content</th>
                  <th scope='col'>Username</th>
                  <th scope='col'>UserId</th>
                  <th scope='col'> <span style={{ marginLeft: "20%" }}></span> Delete</th>
                </tr>
              </MDBTableHead>
              {posts && <>
                {posts ? posts.map((post, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope='row'>{index + 1}</th>
                      <td>{<img alt='' src={post?.content} style={{ objectFit: 'cover', border: '2px solid black', borderRadius: '10px' }} width="50px" height="50px"></img>}</td>
                      <td>{post?.userName}</td>
                      <td>{post?.userId}</td>
                      
                      {post?.isDeleted ? (<td style={{ width: "100px" }}>
                        <Button onClick={() => deleteHandler(post?._id)}
                          variant='info' style={{ width: "100px", height: "30px", fontSize: "small" }}
                        >Reset</Button>
                      </td>
                      )
                        :
                        (<td style={{ width: "100px" }}>
                          <Button onClick={() => deleteHandler(post?._id)}
                            variant='danger' style={{ width: "100px", height: "30px", fontSize: "small" }}
                          >Delete</Button>
                        </td>
                        )}
                    </tr>
                  </MDBTableBody>
                ))
                :
                <></>
              }
              </>}
            </MDBTable>
          </Row>
        </div>
      </div>
    </>
  );
}
