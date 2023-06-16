import React from 'react'
import Login from '../../components/users/login/Login'
import Header from '../../components/navbar/Header'
import Footer from "../../components/footer/Footer";

function UserLogin() {
  return (
    <div>
      <Header />
      <Login />
      <div className='footer-gradient'></div>
      <Footer />
      <div className='feedback-gradient'></div>
    </div>
  )
}

export default UserLogin
