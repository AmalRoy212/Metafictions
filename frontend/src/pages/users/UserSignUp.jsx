import React from 'react';
import Signup from '../../components/users/signup/SingUp';
import Header from '../../components/navbar/Header';
import CarEnv from '../../components/3dComponents/CarEnv';
import "../../styles/styles.css"
import Footer from '../../components/footer/Footer';

function UserSignUp() {
  return (
    <div>
      <Header />
      <Signup />
      <div className='feedback-gradient'></div>
      <Footer/>
      <div className='footer-gradient' style={{width:"40%"}}></div>
    </div>
  )
}

export default UserSignUp;
