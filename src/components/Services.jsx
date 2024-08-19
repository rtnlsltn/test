import React from "react";
import Tilt from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { servicesList } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServicesCard = ({ index, title, icon }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("down", "", index * 0.5, 0.75)}
      className='w-full blue-purple-gradient-opaque p-[1px] rounded-[20px]'
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-primary bg-opacity-80 hover:bg-opacity-30 rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
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

const Services = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>What we do</p>
        <h2 className={styles.sectionHeadText}>What you need and nothing you don't.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className='mt-4 text-secondary xl:text-[17px] l:text-[17px] xl:text-[17px] text-[17px] sm:text-[16px] xs:text-[14px] max-w-4xl leading-[30px]'
      >
      We pride ourselves in providing optimal solutions, even if there's less in it for us.
      Whether you need a simple website to grow your small business, an iOS/Android app to
      empower your employees, or a full stack development team to combine them both, we've
      got you covered. Then, when you're ready to get discovered by your customers online,
      we've got that, too.
      </motion.p>

      <div className='mt-20 flex flex-wrap justify-around gap-10'>
        {servicesList.map((service, index) => (
          <ServicesCard key={servicesList.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Services, "services");
