import React from 'react';
import { motion } from "framer-motion";
import "../../utils/styles.css";
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
        <div style={{zIndex:3}}>

        <motion.h1
          variants={textVariant(2)}
          style={{display:'flex',justifyContent:'center',alignItems:'center'}}
        >
          <span style={{fontSize:'5rem',color:"white",fontWeight:'bolder'}}>META FICTION</span>
        </motion.h1>
        <motion.div
          variants={textVariant(2.2)}
          style={{display:'flex',justifyContent:'center'}}
        >
          <span style={{fontSize:'7rem',color:"white",fontWeight:'bolder'}}>MA</span>
          <div style={{ border: "20px solid white", width: "200px", height: "128px", borderRadius: "0 30px 30px 0" }}></div>
          <span style={{fontSize:'7rem',color:"white",fontWeight:'bolder'}}>NESS</span>
        </motion.div>
        </div>

        <motion.div variants={slideIn('right','tween', 0.2, 1)}
        style={{height:'100%',width:"70%"}}
      >
        <div className="absolute w-full h-[300px] hero-gradient rounded-tl-[140px] z-[0] -top-[30px]" />
          <img src="images/cover.png" alt="cover" 
            style={{width:'100%',height:"100%",objectFit:"cover",marginTop:'-5rem',zIndex:1,borderRadius:"50px"}}
          />
          <a href="">
            <div style={{width:'100px',height:"100px",marginLeft:"85%",marginTop:"-8%"}}>
              <img src="images/stamp.png" alt="stamp"
                style={{width:'100%',height:"100%"}}
              /> 
            </div>
          </a>
          <div className="gradient02" />
      </motion.div>
      </div>
    </motion.div>
  )
}

export default Hero
