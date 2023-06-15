'use client';

import { motion } from "framer-motion";
import {fadeIn} from "../../utils/motions";

const ExploreCard = ({ id, imgUrl, title, index, active, handleClick }) => (
  <motion.div
    variants={fadeIn('right','spring',index * 0.5,0.75)}
    className={`relative ${active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'}
      flex items-center justify-center min-w-[170px] h-[700px] transition-[flex]
      ease-out-flex cursor-pointer
    `}
  >
    <img src={imgUrl} alt={title} 
      className="absolute w-full h-full object-cover rounded-[24px]"
    />
    {
      active !== id && (
        <h3 className="font-semibold sm:text-[26px] text-[18px] text-white absolute z-0
        ">
          {title}
        </h3>
      )
    }
    Explore Card
  </motion.div>
);

export default ExploreCard;
