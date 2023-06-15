import React from 'react';
import { motion } from "framer-motion";
import "../../styles/styles.css";
import { fadeIn, footerVariants } from "../../utils/motions";

function Footer() {
  const motionDivStyles = {
    width: '80%',
    height: '60%',
    border: '2px solid grey',
    borderRadius: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(97.86deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
    // boxShadow: '0px 0px 20px rgba(255, 255, 255, 0.3)',
  };
  
  return (
    <div style={{ width: "100%", height: "200px", display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: 'column' }}>
      <motion.div
        variants={fadeIn('down', 'tween', 0.5, 1)}
        initial="hidden"
        whileInView="show"
        style={motionDivStyles}
      >
        <a href="" style={{ textDecoration: 'none', margin: '1%' }}>
          <motion.img variants={fadeIn('up', 'tween', 0.7, 1)}
            src='images/twitter.svg'
            alt='cover'
            style={{ widows: '20px', height: '20px', margin: '1%' }}
          />
        </a>
        <a href="" style={{ textDecoration: 'none', margin: '1%' }}>
          <motion.img variants={fadeIn('down', 'tween', 0.7, 1)}
            src='images/linkedin.svg'
            alt='cover'
            style={{ widows: '20px', height: '20px', margin: '1%' }}
          />
        </a>
        <a href="" style={{ textDecoration: 'none', margin: '1%' }}>
          <motion.img variants={fadeIn('up', 'tween', 0.7, 1)}
            src='images/instagram.svg'
            alt='cover'
            style={{ widows: '20px', height: '20px', margin: '1%' }}
          />
        </a>
        <a href="" style={{ textDecoration: 'none', margin: '1%' }}>
          <motion.img variants={fadeIn('down', 'tween', 0.7, 1)}
            src='images/headset.svg'
            alt='cover'
            style={{ widows: '20px', height: '20px', margin: '1%' }}
          />
        </a>
        <a href="" style={{ textDecoration: 'none', margin: '1%' }}>
          <motion.img variants={fadeIn('up', 'tween', 0.7, 1)}
            src='images/menu.svg'
            alt='cover'
            style={{ widows: '20px', height: '20px', margin: '1%' }}
          />
        </a>
        <a href="" style={{ textDecoration: 'none', margin: '1%' }}>
          <motion.img variants={fadeIn('down', 'tween', 0.7, 1)}
            src='images/vercel.svg'
            alt='cover'
            style={{ widows: '20px', height: '20px', margin: '1%' }}
          />
        </a>
        <a href="" style={{ textDecoration: 'none', margin: '1%' }}>
          <motion.img variants={fadeIn('up', 'tween', 0.7, 1)}
            src='images/vrpano.svg'
            alt='cover'
            style={{ widows: '20px', height: '20px', margin: '1%' }}
          />
        </a>

        <a href="" style={{ textDecoration: 'none', margin: '1%' }}>
          <motion.p
            variants={fadeIn('left', 'tween', 0.7, 1)}
            style={{ color: 'white', marginTop: '10px' }}
          >
            @ken940005@gmail.com
          </motion.p>
        </a>
      </motion.div>

    </div>
  )
}

export default Footer
