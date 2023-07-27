import React from 'react'
import Header from '../../components/navbar/Header'
import Footer from "../../components/footer/Footer";
import Otp from '../../components/otp/Otp';

function OtpVerify() {
  return (
    <div>
      <Header />
      <Otp />
      <div className='footer-gradient' style={{width:"40%"}}></div>
      <Footer />
      <div className='feedback-gradient' style={{ width: "40%" }}></div>
    </div>
  )
}

export default OtpVerify
