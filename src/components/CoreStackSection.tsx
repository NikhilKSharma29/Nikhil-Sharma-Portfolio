"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { FaReact, FaNodeJs, FaHtml5, FaCss3, FaJava, FaDatabase } from "react-icons/fa";
import { SiNextdotjs, SiThreedotjs, SiTypescript, SiFramer, SiTailwindcss } from "react-icons/si";
import { DiJavascript } from "react-icons/di";
import React from "react";
import { FaE } from "react-icons/fa6";

interface TechStack {
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  proficiency: number;
}

export default function CoreStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [hoveredTech, setHoveredTech] = useState<number | null>(null);
  
  const coreStack: TechStack[] = [
    {
      name: "HTML",
      description: "Building interactive UIs with React's component-based architecture",
      icon: <FaHtml5 className="text-5xl" />,
      color: "from-[#61DAFB]/80 to-[#61DAFB]/30",
      proficiency: 92
    },
    {
      name: "CSS",
      description: "Building interactive UIs with React's component-based architecture",
      icon: <FaCss3 className="text-5xl" />,
      color: "from-[#61DAFB]/80 to-[#61DAFB]/30",
      proficiency: 86
    },
    {
      name: "React",
      description: "Building interactive UIs with React's component-based architecture",
      icon: <FaReact className="text-5xl" />,
      color: "from-[#61DAFB]/80 to-[#61DAFB]/30",
      proficiency: 80
    },
    {
      name: "Next.js",
      description: "Leveraging server-side rendering and static generation for optimized websites",
      icon: <SiNextdotjs className="text-5xl" />,
      color: "from-white/80 to-white/30",
      proficiency: 75
    },
    {
      name: "Three.js",
      description: "Creating immersive 3D experiences in the browser",
      icon: <SiThreedotjs className="text-5xl" />,
      color: "from-[#000000]/80 to-[#000000]/30",
      proficiency: 70
    },
    {
      name: "GSAP",
      description: "Crafting professional animations with precise control",
      icon: <DiJavascript className="text-5xl" />,
      color: "from-[#88CE02]/80 to-[#88CE02]/30",
      proficiency: 91
    },
    {
      name: "TypeScript",
      description: "Building type-safe applications with enhanced developer experience",
      icon: <SiTypescript className="text-5xl" />,
      color: "from-[#3178C6]/80 to-[#3178C6]/30",
      proficiency: 88
    },
    {
      name: "Framer Motion",
      description: "Creating fluid animations and gestures for React applications",
      icon: <SiFramer className="text-5xl" />,
      color: "from-[#0055FF]/80 to-[#0055FF]/30",
      proficiency: 88
    },
    {
      name: "Tailwind CSS",
      description: "Building modern designs with utility-first CSS framework",
      icon: <SiTailwindcss className="text-5xl" />,
      color: "from-[#38B2AC]/80 to-[#38B2AC]/30",
      proficiency: 95
    },
    {
      name: "Node.js",
      description: "Developing scalable server-side applications",
      icon: <FaNodeJs className="text-5xl" />,
      color: "from-[#339933]/80 to-[#339933]/30",
      proficiency: 85
    },
    {
      name: "Express.js",
      description: "Building interactive UIs with React's component-based architecture",
      icon: <FaE className="text-5xl" />,
      color: "from-[#61DAFB]/80 to-[#61DAFB]/30",
      proficiency: 78
    },
    {
      name: "MongoDB",
      description: "Building interactive UIs with React's component-based architecture",
      icon: <FaDatabase className="text-5xl" />,
      color: "from-[#61DAFB]/80 to-[#61DAFB]/30",
      proficiency: 70
    }
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
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (proficiency: number) => ({
      width: `${proficiency}%`,
      transition: {
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2
      }
    })
  };
  
  return (
    <section
      id="stack"
      ref={sectionRef}
      className="section bg-background relative py-24 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-40 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-40 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-[80px] -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div
          className="mb-20 text-center"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
        >
          <h2 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-accent to-foreground">
            Core Stack
          </h2>
          <p className="text-secondary mt-6 max-w-2xl mx-auto text-lg">
            The technologies I leverage to bring ideas to life
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {coreStack.map((tech, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative group"
              onMouseEnter={() => setHoveredTech(index)}
              onMouseLeave={() => setHoveredTech(null)}
            >
              <div className="relative bg-tertiary/10 backdrop-blur-sm border border-tertiary/20 rounded-xl p-6 h-full transition-all duration-300 hover:border-accent/30 overflow-hidden">
                {/* Background gradient based on tech color */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10 rounded-xl`}></div>
                
                <div className="flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="text-accent mr-3">
                      {tech.icon}
                    </div>
                    <h3 className="text-2xl font-bold">{tech.name}</h3>
                  </div>
                  
                  <p className="text-secondary mb-6 text-sm flex-grow">
                    {tech.description}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between text-xs text-secondary mb-2">
                      <span>Proficiency</span>
                      <span>{tech.proficiency}%</span>
                    </div>
                    <div className="h-1.5 bg-tertiary/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent rounded-full"
                        custom={tech.proficiency}
                        variants={progressVariants}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Hover effect */}
                <AnimatePresence>
                  {hoveredTech === index && (
                    <motion.div 
                      className="absolute -bottom-1 -right-1 w-16 h-16 opacity-20"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.2 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {tech.icon}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 