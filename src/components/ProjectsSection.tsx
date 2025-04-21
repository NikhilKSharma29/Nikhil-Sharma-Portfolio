"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  slug: string;
  githubUrl: string;
}

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Portfolio Website",
      slug: "portfolio",
      githubUrl: "https://github.com/NikhilKSharma29/personal_portfolio"
    },
    {
      id: 2,
      title: "Chat Application",
      slug: "chat-app",
      githubUrl: "https://github.com/NikhilKSharma29/chat-application"
    },
    {
      id: 3,
      title: "Job Portal",
      slug: "job-portal",
      githubUrl: "https://github.com/NikhilKSharma29/Online-Job-portal"
    },
    {
      id: 4,
      title: "Employee Management System", 
      slug: "ems",
      githubUrl: "https://github.com/NikhilKSharma29/Employee-management-system"
    },
    {
      id: 5,
      title: "Task Management System",
      slug: "tms",
      githubUrl: "https://github.com/NikhilKSharma29/project-pilot-spark"
    },
    {
      id: 6,
      title: "React Portfolio",
      slug: "react-portfolio",
      githubUrl: "https://github.com/NikhilKSharma29/React-portfolio"
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const titleVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: { 
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };
  
  return (
    <section
      id="works"
      ref={sectionRef}
      className="section bg-background relative py-28"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-accent to-foreground">
            Selected Work
          </h2>
          <p className="text-secondary max-w-lg mx-auto">
            A collection of projects demonstrating my expertise in design and development
          </p>
        </div>
        
        <motion.ul
          className="max-w-3xl mx-auto space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.li 
              key={project.id}
              className="relative"
              variants={itemVariants}
              onMouseEnter={() => setHoveredItem(project.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-6">
                  <span className="text-2xl font-light text-accent/50">{String(index + 1).padStart(2, '0')}</span>
                  
                  <Link href={`/works/${project.slug}`} className="group">
                    <motion.h3 
                      className="text-3xl md:text-5xl font-medium relative inline-block"
                      animate={{
                        color: hoveredItem === project.id ? 'var(--accent)' : 'var(--foreground)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                      <div className="h-[2px] w-full bg-accent/30 mt-2 overflow-hidden">
                        <motion.div 
                          className="h-full bg-accent origin-left"
                          initial="hidden"
                          animate={hoveredItem === project.id ? "visible" : "hidden"}
                          variants={titleVariants}
                        />
                      </div>
                    </motion.h3>
                  </Link>
                </div>
                
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary hover:text-accent transition duration-300"
                  aria-label={`GitHub repository for ${project.title}`}
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24"
                    className="w-7 h-7 fill-current"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
} 