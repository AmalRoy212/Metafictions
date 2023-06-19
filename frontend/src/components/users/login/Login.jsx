import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion"
import { zoomIn, fadeIn } from "../../../utils/motions"
import { toast } from 'react-toastify'
import axios from '../../../configs/axios';
import { login } from '../../../redux-toolkit/authSlice';
import FormContainer from "../../formContaner/FormContainer";


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

  const submitHander = (e) =>{
    e.preventDefault();
      try {
        axios.post('/users/auth',{
          email,
          password
        }).then((res)=>{
          console.log(res.data);
          dispatch(login(res.data.token));
          navigate('/home');
          setLoading(false);
        }).catch((error) => toast.error("Credential issues"))
      } catch (error) {
        toast.error("Cannection issuse",error);
      }
    
  }

  return (
    <motion.div
      variants={zoomIn(0.5,0.5)}
      initial="hidden"
      whileInView="show"
      viewport={{ once:false, amount:0.25 }}
      style={{ boxShadow: '0 5px 15px rgba(0, 0, 0, .5)', marginTop: '5rem',background:"none", border:'3px solid grey', backdropFilter: 'blur(5px)', borderRadius:'20px',marginLeft:"35%",marginRight:"35%",padding:'2%',marginBottom:"5rem" }}
    >


      <motion.h3
        variants={fadeIn("left","tween",0.5,1)}
        initial="hidden"
        whileInView="show"
        style={{color:'white',display:'flex',justifyContent:'center'}}
      >Log In</motion.h3>
      <Form onSubmit={submitHander} style={{color:'white'}}>
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
        <div style={{color:'white',display:'flex',justifyContent:'center', margin:'1rem'}}>
          <Button type='submit' variant='primary' className='mt-3'>Log In</Button>
        </div>
        <Row>
          <Col>
            <span style={{color:'white',display:'flex',justifyContent:'center'}} >New to MetaFiction ? <Link to={'/signup'}> Create Account</Link></span>
          </Col>
        </Row>
      </Form>
    </motion.div>
  )
}

export default Login
