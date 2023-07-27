import React from 'react';
import { motion } from "framer-motion";
import "../../styles/styles.css";
import { slideIn, staggerContainer, textVariant} from "../../utils/motions";

function Hero() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false , amount: 0.25}}
    >
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:"100%",height:"50vh",flexDirection:'column',marginTop:'15%'}}>
        <div style={{ zIndex: 3, marginLeft:".7rem" }}>

          <motion.h1
            variants={textVariant(2)}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <span style={{ fontSize: '3rem', color: "white", fontWeight: 'bolder' }}>META FICTION</span>
          </motion.h1>
          <motion.div
            variants={textVariant(2.2)}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '-1.5rem' }}
          >
            <span style={{ fontSize: '4rem', color: "white", fontWeight: 'bolder' }}>MA</span>
            <div style={{ border: "15px solid white", width: "130px", height: "96px", borderRadius: "0 22.5px 22.5px 0" }}></div>
            <span style={{ fontSize: '4rem', color: "white", fontWeight: 'bolder' }}>NESS</span>
          </motion.div>
        </div>

      <motion.div variants={slideIn('right','tween', 0.2, 1)}
        style={{maxHeight:'300px',width:"80%", objectFit:"cover", }}

      >
          <img src="https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?cs=srgb&dl=pexels-lucie-liz-3165335.jpg&fm=jpg" alt="cover" 
            style={{width:'100%',height:"100%",objectFit:"cover",marginTop:'-5rem',zIndex:1,borderRadius:"50px"}}
          />
          <a href="">
            <div style={{width:'50px',height:"50px",marginLeft:"85%",marginTop:"-10%"}}>
              <img src="images/stamp.png" alt="stamp"
                style={{width:'100%',height:"100%"}}
              /> 
            </div>
          </a>
          <div className="gradient03" style={{width:"40%"}} />
      </motion.div>
      </div>
    </motion.div>
  )
}

export default Hero
