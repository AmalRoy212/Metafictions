import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaAvianex, FaBattleNet, FaSistrix } from 'react-icons/fa';
import { motion } from "framer-motion";
import { navVariants } from "../../utils/motions"
import "../../styles/styles.css";

function Header() {
  return (
    <motion.div
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false , amount: 0.25}}
    >
      <div className="gradient01" />
      <header style={{position:"absolute",top:5,width:"100%"}}>
        <Navbar bg='transperent' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <Navbar.Brand style={{fontWeight:'bold'}} href='/'>METAFICTION</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ms-auto'>
                <Nav.Link href='#about'>
                  <FaAvianex size={30} style={{ fontWeight: 'bold' }} /> Explore
                </Nav.Link>
                <Nav.Link href=''>
                  <FaBattleNet size={30} style={{ fontWeight: 'bold' }} /> Account
                </Nav.Link>
                <Nav.Link href=''>
                  <FaSistrix size={30} style={{ fontWeight: 'bold' }} /> Search
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </motion.div>
  )
}

export default Header
