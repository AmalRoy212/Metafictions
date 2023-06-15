import { useState } from "react";
import { motion } from "framer-motion";
import  ExploreCard  from "../exploreCards/ExploreCards";
import { TypingText, TitleText } from "../typingText/TypingText";
// import styles from "../../styles/style.css";
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
          <br className="md:block hidden" />to explore</>} textStyles="text-center" />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5"
          style={{}}
        >
          {
            exploreWorlds.map((world, index) => (
              <ExploreCard
                key={world.id}
                {...world}
                index={index}
                active={active}
                handleClick={setActive}
              />
            ))
          }
        </div>
      </motion.div>
      Explore section
    </section>
  )
};

export default Explore;
