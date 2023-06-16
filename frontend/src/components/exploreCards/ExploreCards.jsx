'use client';

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/motions";

const ExploreCard = ({ id, imgUrl, title, index, active, handleClick }) => (
  <div >
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      key={id}
    >
      <img src={imgUrl} alt={title}
        style={{ width: "100%", height: "400px",objectFit:"cover",borderRadius:"20px" }}
      />
      {
        active !== id && (
          <h3 style={{color:"white",marginTop:"-15%",marginLeft:"10%"}}>
            {title}
          </h3>
        )
      }
    </motion.div>
  </div>
);

export default ExploreCard;
