import React from 'react';
import { motion } from "framer-motion";
import { TypingText } from "../typingText/TypingText";
import "../../styles/styles.css";
import { fadeIn, staggerContainer } from "../../utils/motions";

function Discription() {
  return (
    <section style={{ padding: '5%' }} id="about">
      <motion.div variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        style={{ color: 'white' }}
      >
        <TypingText title="| Wonder what you can ?"
          textStyles="text-center"
        />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <motion.p
            variants={fadeIn('up', 'tween', 0.2, 1)}
            style={{ color: 'white', padding: '10%', paddingTop: '1%', fontSize: "1.5rem", margin: 'auto' }}
          >
            <span style={{ fontWeight: "bolder", fontSize: "1.9rem" }}> Connect </span>
            to people around you love games
            <br />
            <span style={{ fontWeight: "bolder", fontSize: "1.9rem" }}> Video Streaming </span>
            thats lot of fun
            <br />
            <span style={{ fontWeight: "bolder", fontSize: "1.9rem" }}> Live Chatting </span>
            build your own team
            <br />
            <span style={{ fontWeight: "bolder", fontSize: "1.9rem" }}> Post Likes Comments </span>
            and what not ..?
            <br />
            <span style={{ fontWeight: "bolder", fontSize: "1.9rem" }}> Follows </span>
            create some fans
            <br />

          </motion.p>
        </div>
        <motion.img
          variants={fadeIn('up', 'tween', 0.5, 1)}
          src="images/arrow-down.svg"
          alt="arrow down"
          style={{ marginLeft: '50%', marginTop: '-5%' }}
        />
      </motion.div>
      <div className="gradient02" style={{ zIndex: 0 }} />

    </section>
  )
}

export default Discription

