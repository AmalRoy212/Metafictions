import React from 'react';
import { motion } from "framer-motion";
import { TypingText } from "../typingText/TypingText";
import "../../styles/styles.css";
import { fadeIn, staggerContainer } from "../../utils/motions";

function About() {
  return (
    <section style={{marginTop:'10%',padding:'10%'}}>
    <motion.div variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      style={{color:'white'}}
    >
      <TypingText title="| About metafiction"
        textStyles="text-center"
      />
      <motion.p
        variants={fadeIn('up', 'tween', 0.2, 1)}
        style={{color:'white',padding:'10%', paddingTop:'1%',fontSize:"1.5rem"}}
      >
        <span style={{fontWeight:"bolder",fontSize:"1.9rem"}}>MetaFiction </span>
        is new thing in the future, where you can enjoy the
        viritual world by feeling like its really real , you can feel what
        you feel in the metaverse world , because this is really the
        <span style={{fontWeight:"bolder",fontSize:"1.9rem"}}> madness of the metaverse </span>
        of today , using only
        <span style={{fontWeight:"bolder",fontSize:"1.9rem"}}> VR </span>
        devices you can easly explore
        the metaverse world you want , turn your dream in to reality .
        Let's
        <span style={{fontWeight:"bolder",fontSize:"1.9rem"}}> explore </span>
        the madness of metaverse by scrolling down
      </motion.p>
      <motion.img
        variants={fadeIn('up', 'tween', 0.5, 1)}
        src="images/arrow-down.svg"
        alt="arrow down"
        style={{marginLeft:'50%',marginTop:'-5%'}}
      />
    </motion.div>
    <div className="gradient02" style={{zIndex:0}} />

  </section>
  )
}

export default About
