import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaAvianex, FaBattleNet, FaPhoenixSquadron } from 'react-icons/fa';
import { LinkContainer } from "react-router-bootstrap";
import { motion } from "framer-motion";
import { navVariants } from "../../utils/motions"
import "../../styles/styles.css";
import "../home/HomeStyle.css"

function Header() {
  return (
    <motion.div
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false , amount: 0.25}}
    >
      <div className="gradient01" style={{width:"40%"}} />
      <header style={{position:"absolute",top:5,width:"100%", zIndex:17}}>
        <Navbar bg='transperent' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <LinkContainer to={'/'}>
              <Navbar.Brand style={{fontWeight:'bold'}} href='/'>METAFICTION</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav' className='card'>
              <Nav className='ms-auto'>
                <Nav.Link href='#about'>
                  <FaAvianex size={30} style={{ fontWeight: 'bold' }} /> Explore
                </Nav.Link>
                <LinkContainer to={'/login'}>
                  <Nav.Link>
                    <FaBattleNet size={30} style={{ fontWeight: 'bold' }} /> Account
                  </Nav.Link>
                </LinkContainer> 
                <LinkContainer to={'/'}>
                  <Nav.Link>
                    <FaPhoenixSquadron size={30} style={{ fontWeight: 'bold' }} /> Service
                  </Nav.Link>
                </LinkContainer> 
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </motion.div>
  )
}

export default Header
