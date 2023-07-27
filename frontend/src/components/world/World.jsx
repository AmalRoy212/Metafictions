import React from 'react';
import { motion } from "framer-motion";
import { FaFly } from 'react-icons/fa'
import "../../styles/styles.css";
import { fadeIn, footerVariants } from "../../utils/motions";



function World() {
  return (
    <>
      <motion.div
        variants={footerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        style={{ width: "100%", height: "50vh", padding: "5%", objectFit:"cover" }}
      >
        <motion.img
          variants={fadeIn("up", "tween", 0.5, 1)}
          src='images/map.png'
          alt='map'
          style={{ width: "100%", height: "100%" }}
        />
        {/* <FaFly style={{ color: 'red',marginLeft:'63%',marginTop:'-25%' }} size={30} />
        <FaFly style={{ color: 'red',marginLeft:'-2%',marginTop:'-27%' }} size={30} /> */}
      </motion.div>
      <div className='gradient002' style={{ width: "40%" }} />
    </>

  )
}

export default World
