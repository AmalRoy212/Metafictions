import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';
import { Button} from 'react-bootstrap';
import { MDBCol } from "mdbreact";

function AdminHeader() {
  return (
    <div>
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Admin</Navbar.Brand>
            <Nav className="me-auto">
              {/* <LinkContainer to={'/admin/home'}>
                <Nav.Link >Users</Nav.Link>
              </LinkContainer>

              <LinkContainer to={'/admin/create/user'}>
                <Nav.Link>Create User</Nav.Link>
              </LinkContainer> */}

              {/* <LinkContainer to={'/admin/update/user'}>
                <Nav.Link>Update User</Nav.Link>
              </LinkContainer> */}
            </Nav>
          <Button className='btn-danger' style={{color:'white'}}>Log Out</Button>
          </Container>
        </Navbar>
        <br />
      </>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <MDBCol md="6">
          <div className="input-group md-form form-sm form-1 pl-0">
            <input
              style={{ margin: '1rem' }}
              className="form-control my-0 py-1"
              type="text"
              placeholder="Search"
              aria-label="Search"
            />

          </div>
        </MDBCol>
        <Button style={{ margin: '1rem' }} variant='primary' className='mt-3'>
          Search
        </Button>
      </div>
    </div>
  )
}

export default AdminHeader
