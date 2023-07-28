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

  const footerStyles = {
    width: "100%",
    height: "200px",
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'column'
  };

  // Media query for smaller devices (adjust the max-width as needed)
  const mediaQueryStyles = {
    '@media (max-width: 768px)': {
      width: '90%', // Reduce width for smaller screens
      height: '50%', // Adjust height as needed
    },
  };

  // Merge the styles using spread operator
  const mergedMotionDivStyles = { ...motionDivStyles, ...mediaQueryStyles };

  return (
    <div style={footerStyles}>
      <div
        style={mergedMotionDivStyles}
      >
        <a href="" style={{ textDecoration: 'none', margin: '1%' }}>
          <motion.img variants={fadeIn('up', 'tween', 0.7, 1)}
            src='images/twitter.svg'
            alt='cover'
            style={{ widows: '20px', height: '20px', margin: '1%' }}
          />
        </a>
        {/* Add the rest of the social media icons */}
        {/* ... */}
        <a href="" style={{ textDecoration: 'none', margin: '1%' }}>
          <motion.p
            variants={fadeIn('left', 'tween', 0.7, 1)}
            style={{ color: 'white', marginTop: '10px' }}
          >
            @ken940005@gmail.com
          </motion.p>
        </a>
      </div>
    </div>
  )
}

export default Footer;
