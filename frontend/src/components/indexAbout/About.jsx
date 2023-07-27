import React from 'react';
import { motion } from "framer-motion";
import { TypingText } from "../typingText/TypingText";
import "../../styles/styles.css";
import { fadeIn, staggerContainer } from "../../utils/motions";

function About() {
  return (
    <section style={{ marginTop: "8%", padding: '5%' }} id="about">
      <motion.div variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        style={{ color: 'white' }}
      >
        <TypingText title="| About metafiction"
          textStyles="text-center"
        />
        <motion.p
          variants={fadeIn('up', 'tween', 0.2, 1)}
          style={{ color: 'white', padding: '10%', paddingTop: '1%', fontSize: "1.5rem" }}
          className="text-lg" // Adding Bootstrap class to handle font size on smaller devices
        >
          <span style={{ fontWeight: "bolder", fontSize: "1.9rem" }}>MetaFiction </span>
          is an exciting new project designed specifically for gamers and streamers,
          combining the elements of social media and gaming into one immersive platform.
          It aims to provide a unique and engaging experience for gaming enthusiasts,
          allowing them to connect, interact, and share their gaming adventures with
          like-minded individuals.
          <br />
          metaverse is a new thing in the future, where you can enjoy the
          virtual world by feeling like it's really real. You can feel what
          you feel in the metaverse world because this is really the
          <span style={{ fontWeight: "bolder", fontSize: "1.9rem" }}> madness of the metaverse </span>
          of today. Using only
          <span style={{ fontWeight: "bolder", fontSize: "1.9rem" }}> VR </span>
          devices, you can easily explore
          the metaverse world you want and turn your dream into reality.
          Let's
          <span style={{ fontWeight: "bolder", fontSize: "1.9rem" }}> explore </span>
          the madness of the metaverse by scrolling down.
        </motion.p>
        <motion.img
          variants={fadeIn('up', 'tween', 0.5, 1)}
          src="images/arrow-down.svg"
          alt="arrow down"
          style={{ marginLeft: '50%', marginTop: '-5%' }}
        />
      </motion.div>
      <div className="gradient02" style={{ zIndex: 0, width:"40%" }} />

    </section>
  )
}

export default About;
