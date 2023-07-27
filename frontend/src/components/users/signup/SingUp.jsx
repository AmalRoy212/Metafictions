import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from 'react-bootstrap';
import { MDBCol, MDBContainer, MDBRow, MDBCard } from 'mdb-react-ui-kit';
import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import { zoomIn } from "../../../utils/motions"
import { userSingUp } from '../../../functionalities/userApiFunctionalities';
import { FirebaseContext } from "../../../contexts/firebaseContexts";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [image, setImage] = useState('');

  const { firebase } = useContext(FirebaseContext)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const submitHandler = async function (e) {
    e.preventDefault();
    await userSingUp({
      name,
      email,
      password,
      confirmPassword,
      image,
      firebase,
      dispatch,
      navigate
    })
  };

  return (
    <motion.div
      variants={zoomIn(0.5,.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once : false, amount : 0.25 }}
      style={{marginBottom:"5rem"}}
    >
      <MDBContainer className="h-100 w-60" style={{marginTop:'-4rem', zIndex:17}}>
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="6">
            <MDBCard style={{ boxShadow: '0 5px 15px rgba(0, 0, 0, .5)', marginTop: '5rem',background:"none", border:'3px solid grey', backdropFilter: 'blur(5px)', borderRadius:'20px', padding:"5px" }}>
              <h3 style={{color:"white", display:'flex',justifyContent:'center'}}>Sign Up</h3>
              <Form onSubmit={null} style={{color:'white'}}>
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

                <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  <Button type='submit' variant='primary' className='mt-3' onClick={submitHandler}>
                    Sign Up
                  </Button>
                </div>

                <Row className='py-3'>
                  <Col style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                    <span style={{color:'white'}}> Already have an account? </span><Link to={'/login'} style={{marginLeft:"1rem"}}>Log in</Link>
                  </Col>
                </Row>
              </Form>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </motion.div>
  )
}

export default Signup;
