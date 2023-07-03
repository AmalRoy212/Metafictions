import React from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { logOutAdmin } from "../../../functionalities/AdminUsersApi";
import { useNavigate } from "react-router-dom";

export default function Leftsidebar() {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ position: "fixed", zIndex: "10", width: "100%", backgroundColor:"#D9D9D9" }}>
        <header style={{ position: "absolute", top: 5, width: "100%", zIndex: 10 }}>
          <Navbar  variant='white' expand='lg' collapseOnSelect>
            <Container>
              <Navbar.Toggle aria-controls='basic-navbar-nav' />
              <Navbar.Collapse id='basic-navbar-nav' className="bg-dark p-2" style={{borderRadius:"10px"}}>
                <span style={{color:"white"}}>Admin</span>
                <Nav className='ms-auto'>
                  <Button onClick={() => {
                    logOutAdmin();
                    navigate('/admin');
                  }}
                  >Log out</Button>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </header>
      </div>
    </>
  );
}
