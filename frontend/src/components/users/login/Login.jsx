import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion"
import { zoomIn, fadeIn } from "../../../utils/motions"
import { googleSignUp, userLogin } from "../../../functionalities/userApiFunctionalities"
import { MDBCard, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';


function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    if(token){
      navigate('/home');
    }
  },[token,navigate])

  const googleHandler = () => {
    googleSignUp()
    // window.open(
    //   "http://localhost:5000/api/usres/google/callback",
    //   "_self"
    // )
  }

  const submitHander = (e) =>{
    e.preventDefault();
    userLogin(email,password,dispatch,navigate);  
  }

  return (
    <>
      <motion.div
        variants={zoomIn(0.5,.5)}
        initial="hidden"
        whileInView="show"
        viewport={{ once : false, amount : 0.25 }}
      >
        <MDBContainer className=" w-60" style={{marginTop:'-4rem', height:"70vh"}}>
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="5">
              <MDBCard style={{ boxShadow: '0 5px 15px rgba(0, 0, 0, .5)', marginTop: '5rem',background:"none", border:'3px solid grey', backdropFilter: 'blur(5px)', borderRadius:'20px', padding:"5px" }}>
                  <motion.h3
                    variants={fadeIn("left", "tween", 0.5, 1)}
                    initial="hidden"
                    whileInView="show"
                    style={{ color: 'white', display: 'flex', justifyContent: 'center' }}
                  >Log In</motion.h3>
                  <Form onSubmit={submitHander} style={{ color: 'white' }}>
                    <Form.Group className='my-p2' controlId='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control type='email' placeholder='Enter email'
                        value={email} onChange={(e) => setEmail(e.target.value)}>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className='my-p2' controlId='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control type='password' placeholder='Enter password'
                        value={password} onChange={(e) => setPassword(e.target.value)}>
                      </Form.Control>
                    </Form.Group>
                    <div style={{ color: 'white', display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                      <Button type='submit' variant='primary' className='mt-3'>Log In</Button>
                      {/* <Button variant='info' onClick={googleHandler} className='mt-3' style={{ marginLeft: "5px" }}>Google+</Button> */}
                    </div>
                    <Row>
                      <Col>
                        <span style={{ color: 'white', display: 'flex', justifyContent: 'center' }} >New to MetaFiction ? <Link to={'/signup'} style={{ marginLeft: "1rem" }}> Create Account</Link></span>
                      </Col>
                    </Row>
                  </Form>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </motion.div>
    </>
  )
}

export default Login
