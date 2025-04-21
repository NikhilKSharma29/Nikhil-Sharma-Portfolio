"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { StaticImageData } from "next/image";

// Import images
import portfolioImage from "@/Images/portfolio-website.png";
import profileImage from "@/Images/chatapp.png";
import jobPortalImage from "@/Images/job-portal.png";
import emsImage from "@/Images/Employee_management-sys.png";
import tmsImage from "@/Images/task-managemt-sys.png";
import reactPortfolioImage from "@/Images/react-portfolio.png";

interface Project {
  id: number;
  title: string;
  bgColor: string;
  number: string;
  slug: string;
  description?: string;
  technologies?: string[];
  images?: StaticImageData[];
  liveUrl?: string;
  githubUrl?: string;
}

// This is a mock database of projects
// In a real app, you'd fetch this data from an API or CMS
const projectsData: Project[] = [
  {
    id: 1,
    title: "Portfolio Website",
    bgColor: "#222233",
    number: "01",
    slug: "portfolio",
    description: "A creative Portfolio Website using HTML, CSS, and JavaScript.",
    technologies: ["HTML","CSS","JavaScript"],
    images: [portfolioImage],
    githubUrl: "https://github.com/NikhilKSharma29/personal_portfolio"
  },
  {
    id: 2,
    title: "Chat Application",
    bgColor: "#222233",
    number: "02",
    slug: "chat-app",
    description: "Real-time Chat Application using React, Node.js, Express.js, MongoDB, and Socket.IO.",
    technologies: ["React","Node.js","Express.js","MongoDB","Socket.IO", "Redux-toolkit"],
    images: [profileImage],
    githubUrl: "https://github.com/NikhilKSharma29/chat-application"
  },
  {
    id: 3,
    title: "Job Portal",
    bgColor: "#222233",
    number: "03",
    slug: "job-portal",
    description: "Online Job Portal using Mern Stack For job seekers and employers to connect.",
    technologies: ["React", "Node.js", "Express.js", "Tailwind CSS", "MongoDB", "Redux-toolkit"],
    images: [jobPortalImage],
    githubUrl: "https://github.com/NikhilKSharma29/Online-Job-portal"
  },
  {
    id: 4,
    title: "Employee Management System",
    bgColor: "#222233",
    number: "04",
    slug: "ems",
    description: "An Employee Management System for managing employees and their details.",
    technologies: ["React","Tailwind CSS", ],
    images: [emsImage],
    githubUrl: "https://github.com/NikhilKSharma29/Employee-management-system"
  },
  {
    id: 5,
    title: "Task Management System",
    bgColor: "#222233",
    number: "05",
    slug: "tms",
    description: "A Task Management System for managing projects, tasks and their details.",
    technologies: ["React","Supabase", "Tailwind CSS"],
    images: [tmsImage],
    githubUrl: "https://github.com/NikhilKSharma29/project-pilot-spark"
  },
  {
    id: 6,
    title: "React Portfolio",
    bgColor: "#222233",
    number: "05",
    slug: "react-portfolio",
    description: "A Portfolio Website using React, Three.js, and animation.",
    technologies: ["React","Three.js"],
    images: [reactPortfolioImage],
    githubUrl: "https://github.com/NikhilKSharma29/React-portfolio"
  }
];

export default function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const unwrappedParams = React.use(params);

  useEffect(() => {
    // Find the project by slug
    const foundProject = projectsData.find(p => p.slug === unwrappedParams.slug);
    
    // If no project found, return 404
    if (!foundProject) {
      notFound();
    }
    
    setProject(foundProject);
    setLoading(false);
  }, [unwrappedParams.slug]);

  // Handle loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent">
          
        </div>
      </div>
    );
  }

  // Handle case where project is null (shouldn't happen due to notFound above)
  if (!project) {
    return notFound();
  }

  return (
    <main className=" pt-35 pb-4">
      <div className="container mx-auto px-4">
        <Link 
          href="/#works" 
          className="inline-flex items-center text-secondary hover:text-accent transition-colors duration-300 mb-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Projects
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {project.title}
            </motion.h1>
            
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className="text-5xl font-light text-accent opacity-30">{project.number}</span>
            </motion.div>
            
            <motion.p
              className="text-secondary text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {project.description}
            </motion.p>
            
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-xl font-medium mb-4">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-tertiary/20 border border-tertiary/40 rounded-md text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="flex gap-4 flex-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block border border-accent px-6 py-3 text-sm font-medium hover:bg-accent hover:text-background transition-all duration-300"
                >
                  Source Code
                </a>
              )}
            </motion.div>
          </div>
          
          <div>
            <motion.div 
              className="aspect-video w-full rounded-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {project.images && project.images.length > 0 ? (
                <Image 
                  src={project.images[0]} 
                  alt={`${project.title} preview`}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div 
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: project.bgColor }}
                >
                  <span className="text-3xl">{project.title}</span>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
} 