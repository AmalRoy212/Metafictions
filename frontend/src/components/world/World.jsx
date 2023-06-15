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
        style={{ width: "100%", height: "100vh", padding: "5%" }}
      >
        <motion.img
          variants={fadeIn("up", "tween", 0.5, 1)}
          src='images/map.png'
          alt='map'
          style={{ width: "100%", height: "100%" }}
        />
        <FaFly style={{ color: 'red',marginLeft:'63%',marginTop:'-58%' }} size={30} />
        <FaFly style={{ color: 'red',marginLeft:'0%',marginTop:'-68%' }} size={30} />
      </motion.div>
      <div className='gradient002' />

    </>

  )
}

export default World
