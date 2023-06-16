import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow, MDBCard } from 'mdb-react-ui-kit';


function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');

  const navigae = useNavigate();


  const submitHandler = async function (e) {
    
  };

  return (
    <>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="6">
            <MDBCard className='p-5' style={{ boxShadow: '0 5px 15px rgba(0, 0, 0, .5)', marginTop: '5rem', borderRadius: '10px', background: '#DDDDDE' }}>
              <h1>Sign Up</h1>
              <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='name'>
                  <br />
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {image && <img style={{ objectFit: 'cover', border: '2px solid black', borderRadius: '50%' }} className='m2' alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>}
                  </div>
                  <Form.Label style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='mt-2'>Profile Image </Form.Label>
                  <br />
                  <input style={{ width: '99%', border: '1px solid #ced4da', borderRadius: '5px' }} className='m-1 p-1' name='imgSrc' onChange={(e) => setImage(e.target.files[0])} type="file" />
                </Form.Group>

                <Form.Group className='my-2' controlId='name'>
                  <Form.Label style={{ float: 'left' }}>Name </Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Please enter your name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}>
                  </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='email'>
                  <Form.Label style={{ float: 'left' }}>Email Address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Please enter email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}>
                  </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                  <Form.Label style={{ float: 'left' }}>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Please enter Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}>
                  </Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='confirmPassword'>
                  <Form.Label style={{ float: 'left' }}>Confirm Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Confirm Password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}>
                  </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                  Sign Up
                </Button>

                <Row className='py-3'>
                  <Col>
                    Already have an account? <Link to={'/login'}>Register</Link>
                  </Col>
                </Row>
              </Form>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  )
}

export default Signup;
