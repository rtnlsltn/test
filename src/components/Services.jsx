import React, { Suspense, useRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { styles } from "../styles";
import { servicesList } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

import { projects } from "../constants";

const ServicesCard = ({ index, title, category, icon, onSelect }) => (
  <div className='xs:w-[250px] w-full'>
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

        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </div>
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
      <div
        className='bg-tertiary p-5 rounded-2xl sm:w-[360px] w-full'
      >
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
      </div>
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
