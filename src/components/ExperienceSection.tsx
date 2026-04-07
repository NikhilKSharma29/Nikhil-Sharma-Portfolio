"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
  logo?: string;
}

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"]
  });
  
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  
  const experiences: Experience[] = [
    {
      company: "Debug-Shala",
      position: "React Developer Intern",
      period: "2024 - Present",
      description: "Working on real-world projects using HTML, CSS, JavaScript, ReactJS, and AWS Cloud Services. I've built responsive UIs, improved UX performance, and collaborated with teams to develop and debug applications. This role has strengthened my problem-solving, Git/GitHub practices, and cloud deployment skills.",
      technologies: ["React", "Three.js", "GSAP", "WebGL", "Framer Motion"],
      logo: "D"
    },
    {
      company: "Vivaan Enterprises",
      position: "Social Media Marketing Intern",
      period: "2023 - 2024",
      description: "I have experience managing multiple social media accounts, focusing on engagement-driven strategies to grow online presence. Alongside this, I’ve designed and developed websites using HTML, CSS, JavaScript, and React.js, ensuring responsive and user-friendly designs. I also created graphic and video content for various marketing campaigns, blending creativity with technical skills to deliver impactful digital experiences.",
      technologies: ["Graphic Designing", "Video Editing", "Social Media Marketing"],
      logo: "V"
    },
 
  ];

  const headingVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
        delay: i * 0.1
      }
    })
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section bg-background relative py-24 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-40 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[100px] -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-20 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
        >
          <h2 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-accent to-foreground">
            Experience
          </h2>
          <p className="text-secondary mt-6 max-w-2xl mx-auto text-lg">
            A journey through my professional career and achievements
          </p>
        </motion.div>
        
        <div className="max-w-5xl mx-auto">
          {/* Timeline container */}
          <div className="relative" ref={timelineRef}>
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-tertiary/30 transform -translate-x-1/2"></div>
            
            {/* Animated progress */}
            <motion.div 
              className="absolute left-0 md:left-1/2 top-0 w-px bg-accent transform -translate-x-1/2 origin-top"
              style={{ height: timelineHeight }}
            />
            
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative z-10"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={itemVariants}
                  className={`flex flex-col md:flex-row gap-8 mb-24 relative ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className="md:w-1/2 flex justify-center md:justify-end">
                    <div className={`max-w-md ${index % 2 === 0 ? 'md:ml-12' : 'md:mr-12'}`}>
                      <div className="bg-tertiary/10 backdrop-blur-sm border border-tertiary/20 rounded-xl p-6 hover:border-accent/30 transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                            {exp.logo}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold">{exp.company}</h3>
                            <p className="text-secondary text-sm">{exp.position}</p>
                          </div>
                        </div>
                        
                        <p className="text-secondary mb-4">{exp.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mt-4">
                          {exp.technologies.map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-2 py-1 bg-tertiary/20 border border-tertiary/30 rounded-full text-xs text-secondary/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline node */}
                  <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4">
                    <div className="w-4 h-4 rounded-full bg-accent relative">
                      <div className="absolute w-10 h-10 rounded-full bg-accent/20 animate-ping-slow -top-3 -left-3"></div>
                    </div>
                  </div>
                  
                  {/* Date on the other side */}
                  <div className="md:w-1/2 flex justify-center md:justify-start items-center">
                    <div className={`text-center md:text-left ${index % 2 === 0 ? 'md:text-right md:mr-16' : 'md:ml-16'}`}>
                      <span className="text-2xl font-light text-accent">{exp.period}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 