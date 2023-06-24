import React from "react";
import { Button } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import {  Nav } from 'react-bootstrap';


export default function Leftsidebar() {
  return (
    <>
      <div className="col-md-3">
        <div className="card">
          <div className="card-body bg-white" style={{borderBottom:"2px solid grey"}}>
            <div className="h5">Admin Console</div>
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <Button style={{width:"100%"}}>
                <LinkContainer to={'/profile'}>
                  <Nav.Link>Status</Nav.Link>
                </LinkContainer>
              </Button>
            </li>
            <li className="list-group-item">
              <Button className="btn-warning" style={{width:"100%"}}>
                <LinkContainer to={'/profile'}>
                  <Nav.Link>User Management</Nav.Link>
                </LinkContainer>
              </Button>
            </li>
            <li className="list-group-item">
              <Button className="btn-danger" style={{width:"100%"}}>
                <LinkContainer to={'/profile'}>
                  <Nav.Link>Post Management</Nav.Link>
                </LinkContainer>
              </Button>
            </li>
            <li className="list-group-item">
              <Button className="btn-success" style={{width:"100%"}}>
                <LinkContainer to={'/profile'}>
                  <Nav.Link>Comment Management</Nav.Link>
                </LinkContainer>
              </Button>
            </li>
            <li className="list-group-item">
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
