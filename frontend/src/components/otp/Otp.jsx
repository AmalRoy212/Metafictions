import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion"
import { zoomIn, fadeIn } from "../../utils/motions"
import { toast } from 'react-toastify'
import axios from '../../configs/axios';


function Otp() {
  const [otp,setOtp] = useState();

  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth)


  const submitHander = (e) =>{
    e.preventDefault();
      try {
        axios.post('/users/verify',{
          otp
        }).then((res)=>{
          navigate('/login');
        })
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
      >Verification</motion.h3>
      <Form onSubmit={submitHander} style={{color:'white'}}>
        <Form.Group className='my-p2' controlId='email'>
          <Form.Label>OTP</Form.Label>
          <Form.Control type='text' placeholder='Enter OTP' 
          value={otp} onChange={(e)=>setOtp(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <div style={{color:'white',display:'flex',justifyContent:'center', margin:'1rem'}}>
          <Button type='submit' variant='primary' className='mt-3'>Verify</Button>
        </div>
      </Form>
    </motion.div>
  )
}

export default Otp
