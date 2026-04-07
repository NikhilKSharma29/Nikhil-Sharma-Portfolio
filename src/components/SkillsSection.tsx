"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = [
    { id: "all", name: "All Skills" },
    { id: "frontend", name: "Frontend" },
    { id: "design", name: "Design" },
    { id: "tools", name: "Tools & Others" }
  ];

  const skills = [
    { name: "HTML", category: "frontend", proficiency: 95 },
    { name: "CSS", category: "frontend", proficiency: 90 },
    { name: "JavaScript", category: "frontend", proficiency: 92 },
    { name: "TypeScript", category: "frontend", proficiency: 88 },
    { name: "React", category: "frontend", proficiency: 90 },
    { name: "Next.js", category: "frontend", proficiency: 85 },
    { name: "GSAP", category: "frontend", proficiency: 80 },
    { name: "Three.js", category: "frontend", proficiency: 75 },
    { name: "Tailwind CSS", category: "frontend", proficiency: 90 },
    { name: "Framer Motion", category: "frontend", proficiency: 85 },
    { name: "Figma", category: "design", proficiency: 85 },
    { name: "UI/UX Design", category: "design", proficiency: 80 },
    { name: "Git", category: "tools", proficiency: 85 },
    { name: "Responsive Design", category: "frontend", proficiency: 95 },
    { name: "Web Animation", category: "frontend", proficiency: 88 },
    { name: "Performance Optimization", category: "tools", proficiency: 82 },
    { name: "REST API", category: "tools", proficiency: 85 },
    { name: "GraphQL", category: "tools", proficiency: 78 }
  ];

  const filteredSkills = skills.filter(
    skill => selectedCategory === "all" || skill.category === selectedCategory
  );

  useEffect(() => {
    if (!headingRef.current) return;

    // Animate heading
    gsap.fromTo(
      headingRef.current,
      { 
        y: 50,
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill(true));
    };
  }, []);

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: i * 0.05
      },
    }),
  };

  const categoryVariants = {
    inactive: { opacity: 0.6, scale: 0.95 },
    active: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  const progressBarVariants = {
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
      id="skills"
      ref={sectionRef}
      className="section bg-background relative py-24"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16 overflow-hidden">
            <h2 
              ref={headingRef}
              className="text-6xl md:text-8xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-foreground via-accent to-foreground"
            >
              Expertise
            </h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center text-secondary mt-6 max-w-2xl mx-auto"
            >
              A collection of technologies and tools I&apos;ve mastered throughout my journey as a developer, constantly expanding my skillset to create exceptional digital experiences.
            </motion.p>
          </div>

          <motion.div 
            className="flex justify-center flex-wrap gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {skillCategories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedCategory === category.id 
                    ? "border-accent text-accent" 
                    : "border-tertiary text-secondary hover:border-accent/50 hover:text-accent/80"
                }`}
                variants={categoryVariants}
                initial="inactive"
                animate={selectedCategory === category.id ? "active" : "inactive"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            >
              {filteredSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  custom={index}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileHover="hover"
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                  className="bg-tertiary/10 border border-tertiary/20 rounded-lg p-6 backdrop-blur-sm hover:border-accent/30 transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div 
                    className="absolute inset-0 bg-accent/5 z-0 opacity-0 transition-opacity duration-300"
                    animate={{ opacity: hoveredSkill === skill.name ? 1 : 0 }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-semibold group-hover:text-accent transition-colors duration-300">{skill.name}</h3>
                      <span className="text-sm text-secondary">{skill.proficiency}%</span>
                    </div>
                    
                    <div className="h-1.5 bg-tertiary/30 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-accent/80 rounded-full"
                        variants={progressBarVariants}
                        custom={skill.proficiency}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-accent/5 blur-3xl -z-10" />
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-accent/5 blur-3xl -z-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-accent/5 blur-[100px] -z-10" />
    </section>
  );
} 