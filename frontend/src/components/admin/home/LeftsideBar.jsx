import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import {  Nav } from 'react-bootstrap';


export default function Leftsidebar() {
  return (
    <>
      <div className="col-md-3">
        <div className="card">
          <div className="card-body ">
            <div className="h5">Admin Console</div>
          </div>
          <ul className="list-group list-group-flush">

              <Button className="bg-white" style={{width:"100%", marginTop:"10px", color:"black",border:"none"}}>
                <LinkContainer to={'/admin/home'}>
                  <Nav.Link>Status</Nav.Link>
                </LinkContainer>
              </Button>


              <Button className="bg-white" style={{width:"100%", marginTop:"10px", color:"black",border:"none"}}>
                <LinkContainer to={'/admin/users'}>
                  <Nav.Link>User Management</Nav.Link>
                </LinkContainer>
              </Button>


              <Button className="bg-white" style={{width:"100%", marginTop:"10px", color:"black",border:"none"}}>
                <LinkContainer to={'/admin/posts'}>
                  <Nav.Link>Post Management</Nav.Link>
                </LinkContainer>
              </Button>


              <Button className="bg-white" style={{width:"100%", marginTop:"10px", color:"black",border:"none",marginBottom:"1rem"}}>
                <LinkContainer to={'/admin/comments'}>
                  <Nav.Link>Comment Management</Nav.Link>
                </LinkContainer>
              </Button>
          </ul>
        </div>
      </div>
    </>
  );
}
