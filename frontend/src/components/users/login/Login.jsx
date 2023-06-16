import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import FormContainer from "../../formContaner/FormContainer";
import "./Login.css"

function Login() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const submitHander = (e) =>{
    e.preventDefault();
    console.log("submitting");
  }

  return (
    <FormContainer>
      <h1>Log In</h1>
      <Form onSubmit={submitHander}>
        <Form.Group className='my-p2' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control type='email' placeholder='Enter email' 
          value={email} onChange={(e)=>setEmail(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Form.Group className='my-p2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' placeholder='Enter password' 
          value={password} onChange={(e)=>setPassword(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary' className='mt-3'>Log In</Button>
        <Row>
          <Col>
            New to MetaFiction ? <Link to={'/signup'}>Create Account</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  )
}

export default Login
