import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt='web-development'
          className='w-16 h-16 object-contain'
        />

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>About Us</p>
        <h2 className={styles.sectionHeadText}>What's with the jar?</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary xl:text-[17px] l:text-[17px] xl:text-[17px] text-[17px] sm:text-[16px] xs:text-[14px] max-w-4xl leading-[30px]'
      >
       Welcome to Gravity Jar, where we defy the laws of web/app/software development… and
       physics! Founded with a passion for technology, creativity, and ingenuity, Gravity
       Jar operates out of two locations—<b>Green Bay, WI</b>, and <b>St. Petersburg, FL</b>. However,
       we’re happy to meet you online or anywhere in between (the singularity is confusing).
       Our <b>100% USA-based team</b> has a wide range of experience to accomplish any project
       you have in mind, no matter the size.
      </motion.p>

    </>
  );
};

export default SectionWrapper(About, "about");
