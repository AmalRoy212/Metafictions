import { useState } from "react";
import { motion } from "framer-motion";
import  ExploreCard  from "../exploreCards/ExploreCards";
import { TypingText, TitleText } from "../typingText/TypingText";
import "../../styles/styles.css";
import { fadeIn, staggerContainer } from "../../utils/motions";
import { exploreWorlds } from "../../constants/index"

const Explore = () => {
  const [active, setActive] = useState("world-2")
  return (
    <section  id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        
      >
        <TypingText title="| The World" textStyles="text-center" />
        <TitleText title={<>Choose the world you want
          <br/>to explore</>} textStyles="text-center" />
        <div 
          
          style={{height:"90vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}
        >
          {
            exploreWorlds.map((world, index) => (
              <div style={{height:"20rem",width:"18rem",margin:"1%"}}
                key={index}
              >
              <ExploreCard
                key={world.id}
                {...world}
                index={index}
                active={active}
                handleClick={setActive}
                />
                </div>
            ))
          }
        </div>
      </motion.div>
      <div className="gradient002_Orenge" style={{ width: "40%" }} />
    </section>
  )
};

export default Explore;
