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
      {/* <div style={{ position: 'relative', zIndex: -1 }}>
        <CarEnv />
      </div> */}
      {/* <div style={{ position: 'absolute', top: 0, left: 0, right: 50, bottom: 0,  zIndex: 3 }}> */}
        <Signup />
      {/* </div> */}
      <div className='feedback-gradient'></div>
      <Footer/>
      <div className='footer-gradient'></div>
    </div>
  )
}

export default UserSignUp;
