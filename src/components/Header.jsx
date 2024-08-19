import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant, slideIn } from "../utils/motion";

import { GravityJarCanvas } from "./canvas";
import { EarthCanvas } from "./canvas";

const Header = () => {
  var headerArray = [
    'We know how hard it is to find reliable developers.',
    'It can be scary floating out there looking for a good development team.',
    'Oh, hello there.'
  ]
  var randomNum = Math.floor(Math.random()*headerArray.length);

  return (
    <>
      <motion.div variants={fadeIn("", "", .5, 1)}>
        <div className='mt-60'>
          <p className={styles.headTopText}>{headerArray[randomNum]}</p>
        </div>
      </motion.div>
      <motion.div variants={fadeIn("", "", 1.2, 1)}>
        <div className='mb-20'>
          <h2 className={styles.headSubText}>We're glad you found us.</h2>
        </div>
      </motion.div>
      <motion.div
        variants={fadeIn("", "", 2.5, 3)}
        className='xl:flex-1 xl:h-[400px] md:h-[550px] h-[350px]'
      >
        <GravityJarCanvas />
      </motion.div>
      <div className='mb-40'> </div>
    </>
  );
};

export default SectionWrapper(Header, "header");
