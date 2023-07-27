import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { motion } from "framer-motion"
import { zoomIn, fadeIn } from "../../utils/motions"
import { verifyOtp } from "../../functionalities/userApiFunctionalities";
import { MDBCard, MDBCol, MDBContainer, MDBRow } from 'mdb-react-ui-kit';


function Otp() {
  const [otp,setOtp] = useState();

  const navigate = useNavigate();


  const submitHander = async (e) =>{
    e.preventDefault();
    await verifyOtp({otp,navigate});
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
                >Verification</motion.h3>
                <Form onSubmit={submitHander} style={{ color: 'white' }}>
                  <Form.Group className='my-p2' controlId='email'>
                    <Form.Label>OTP</Form.Label>
                    <Form.Control type='text' placeholder='Enter OTP'
                      value={otp} onChange={(e) => setOtp(e.target.value)}>
                    </Form.Control>
                  </Form.Group>
                  <div style={{ color: 'white', display: 'flex', justifyContent: 'center', margin: '1rem' }}>
                    <Button type='submit' variant='primary' className='mt-3'>Verify</Button>
                  </div>
                </Form>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </motion.div>
    </>
  )
}

export default Otp
