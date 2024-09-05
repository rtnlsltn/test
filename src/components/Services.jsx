import React, { Suspense, useRef, useEffect, useState } from "react";
import Tilt from "react-tilt";
import { AnimatePresence, motion } from "framer-motion";

import { styles } from "../styles";
import { servicesList } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

import { projects } from "../constants";
import { github } from "../assets";

const ServicesCard = ({ index, title, category, icon, onSelect }) => (
  <Tilt className='xs:w-[250px] w-full'>
    <motion.div
      variants={fadeIn("down", "", index * 0.5, 0.75)}
      className='w-full blue-purple-gradient-opaque p-[1px] rounded-[20px]'
    >
      <div
        onClick={() => onSelect(category)}
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

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
        <div className='relative w-full h-[230px]'>
          <img
            src={image}
            alt='project_image'
            className='w-full h-full object-cover rounded-2xl'
          />

          <div className='absolute inset-0 flex justify-end m-3 card-img_hover'>
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className='black-gradient w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'
            >
              <img
                src={github}
                alt='source code'
                className='w-1/2 h-1/2 object-contain'
              />
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <h3 className='text-white font-bold text-[24px]'>{name}</h3>
          <p className='mt-2 text-secondary text-[14px]'>{description}</p>
        </div>

        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className={`text-[14px] ${tag.color}`}
            >
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Services = () => {
  const [search, setSearch] = useState("all");
  const [rerender, setRerender] = useState(false);
  const ref = useRef()

  useEffect(() => {
    console.log('setSearch:', search);
  }, [search])

  const filterProjects = projects.filter((project) => {
    if (search == "all") {
      return project.categories
    }
      return project.categories == search
  })

  const filteredProjects = [...filterProjects];
  console.log(filteredProjects);
  // console.log(filteredProjects.map((filteredList)=> (filteredList.index)));

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
          <ServicesCard key={servicesList.title} index={index} {...service} onSelect={setSearch} />
        ))}
      </div>

      <div className='mt-20 flex flex-wrap gap-7'>
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.index} index={project} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Services, "services");

// {projects.map((project, index) => (
//   <ProjectCard key={`project-${index}`} index={index} {...project} />
// ))}
