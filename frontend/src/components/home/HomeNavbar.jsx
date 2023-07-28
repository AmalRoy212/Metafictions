import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaAvianex, FaBattleNet, FaPhoenixSquadron, FaCogs, FaOdnoklassnikiSquare } from 'react-icons/fa';
import { LinkContainer } from "react-router-bootstrap";
// import { motion } from "framer-motion";
// import { navVariants } from "../../utils/motions"
import "../../styles/styles.css";
import "./HomeStyle.css"

function HoemNavbar() {
  return (
    <div
      style={{position:'fixed',zIndex:10,width:"100%",background:"white"}}
    >
      <header style={{position:"fixwd",top:5,width:"100%",zIndex:10}}>
        <Navbar bg='transperent' variant='light' expand='lg' collapseOnSelect>
          <Container>
            <LinkContainer to={'/'}>
              <Navbar.Brand style={{ fontWeight: 'bold', color: "black" }} href='/'><FaBattleNet size={30} style={{ fontWeight: 'bold' }} /> METAFICTION</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav'/>
            <Navbar.Collapse id='basic-navbar-nav' className='card'>
              <Nav className='ms-auto'>
                <LinkContainer to={'/login'}>
                  <Nav.Link>
                    <FaOdnoklassnikiSquare size={30} style={{ fontWeight: 'bold' }} /> Account
                  </Nav.Link>
                </LinkContainer> 
                <LinkContainer to={'/'}>
                  <Nav.Link>
                    <FaBattleNet size={30} style={{ fontWeight: 'bold' }} /> Service
                  </Nav.Link>
                </LinkContainer> 
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </div>
  )
}

export default HoemNavbar
