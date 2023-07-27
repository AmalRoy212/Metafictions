import React from 'react'
import Login from '../../components/users/login/Login'
import Header from '../../components/navbar/Header'
import Footer from "../../components/footer/Footer";

function UserLogin() {
  return (
    <div style={{width:"100%"}}>
      <Header />
      <Login />
      <div className='footer-gradient' style={{width:"40%"}}></div>
      <Footer />
      {/* <div className='feedback-gradient'></div> */}
    </div>
  )
}

export default UserLogin
