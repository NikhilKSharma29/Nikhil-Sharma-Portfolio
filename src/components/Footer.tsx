"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: false, amount: 0.2 });
  
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Works", href: "#works" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];
  
  const socialLinks = [
    { 
      name: "GitHub", 
      url: "https://github.com/NikhilKSharma29", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    },
    { 
      name: "LinkedIn", 
      url: "https://linkedin.com", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    { 
      name: "Twitter", 
      url: "https://twitter.com", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
        </svg>
      )
    },
    { 
      name: "Instagram", 
      url: "https://www.instagram.com/nikhilksharmaa?igsh=cmVudmc4czUxb3oz", 
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    },
  ];

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

  const linkHoverVariants = {
    rest: { width: 0 },
    hover: { width: "100%", transition: { duration: 0.3, ease: "easeInOut" } }
  };

  return (
    <footer 
      ref={footerRef}
      className="relative bg-background py-24 overflow-hidden border-t border-tertiary/20"
    >
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-[70%] bg-gradient-to-t from-tertiary/5 to-transparent -z-10" />
      <div className="absolute top-40 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-40 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-[80px] -z-10" />
      
      <div className="container mx-auto px-4">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <motion.div variants={itemVariants}>
            <Link 
              href="#home" 
              className="inline-block text-4xl md:text-5xl font-bold relative"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-accent">Nikhil Sharma</span>
              <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-accent to-transparent"></span>
            </Link>
          </motion.div>

          <motion.p 
            variants={itemVariants}
            className="text-secondary mt-6 max-w-lg mx-auto text-lg"
          >
            Creating immersive digital experiences with cutting-edge web technologies
            and innovative design solutions.
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex justify-center gap-6 mt-8"
          >
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-secondary hover:text-accent hover:border-accent/30 hover:bg-accent/5 transition-all duration-300"
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-16"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-6 relative inline-flex flex-col">
              Quick Links
              <span className="h-0.5 w-12 bg-accent mt-2"></span>
            </h3>
            <ul className="space-y-4 flex flex-col items-center md:items-start">
              {navLinks.map((link, index) => (
                <li key={link.name} className="relative overflow-hidden">
                  <Link
                    href={link.href}
                    className="text-secondary hover:text-foreground transition-colors duration-300 block relative"
                  >
                    {link.name}
                    <motion.span 
                      className="absolute bottom-0 left-0 h-[1px] bg-accent"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      variants={linkHoverVariants}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-6 relative inline-flex flex-col">
              Services
              <span className="h-0.5 w-12 bg-accent mt-2"></span>
            </h3>
            <ul className="space-y-4 flex flex-col items-center md:items-start">
              <li className="relative overflow-hidden">
                <Link
                  href="#"
                  className="text-secondary hover:text-foreground transition-colors duration-300 block relative"
                >
                  Web Development
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[1px] bg-accent"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={linkHoverVariants}
                  />
                </Link>
              </li>
              <li className="relative overflow-hidden">
                <Link
                  href="#"
                  className="text-secondary hover:text-foreground transition-colors duration-300 block relative"
                >
                  UI/UX Design
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[1px] bg-accent"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={linkHoverVariants}
                  />
                </Link>
              </li>
              <li className="relative overflow-hidden">
                <Link
                  href="#"
                  className="text-secondary hover:text-foreground transition-colors duration-300 block relative"
                >
                  3D & Animation
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[1px] bg-accent"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={linkHoverVariants}
                  />
                </Link>
              </li>
              <li className="relative overflow-hidden">
                <Link
                  href="#"
                  className="text-secondary hover:text-foreground transition-colors duration-300 block relative"
                >
                  Interactive Experiences
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[1px] bg-accent"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={linkHoverVariants}
                  />
                </Link>
              </li>
              <li className="relative overflow-hidden">
                <Link
                  href="#"
                  className="text-secondary hover:text-foreground transition-colors duration-300 block relative"
                >
                  Consultation
                  <motion.span 
                    className="absolute bottom-0 left-0 h-[1px] bg-accent"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    variants={linkHoverVariants}
                  />
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-bold mb-6 relative inline-flex flex-col">
              Contact
              <span className="h-0.5 w-12 bg-accent mt-2"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-secondary hover:text-foreground transition-colors duration-300">sharmanikhil2188@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-secondary hover:text-foreground transition-colors duration-300">+91 9727361026</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-tertiary/10 border border-tertiary/20 flex items-center justify-center text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-secondary hover:text-foreground transition-colors duration-300">Indore, INDIA</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="border-t border-tertiary/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <motion.p variants={itemVariants} className="text-secondary text-sm">
            © {currentYear} <span className="text-foreground">Nikhil Sharma</span>. All rights reserved.
          </motion.p>
          <motion.div variants={itemVariants} className="flex items-center gap-8">
            <Link
              href="#"
              className="text-secondary hover:text-foreground transition-colors text-sm relative overflow-hidden"
            >
              Privacy Policy
              <motion.span 
                className="absolute bottom-0 left-0 h-[1px] bg-accent"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={linkHoverVariants}
              />
            </Link>
            <Link
              href="#"
              className="text-secondary hover:text-foreground transition-colors text-sm relative overflow-hidden"
            >
              Terms of Service
              <motion.span 
                className="absolute bottom-0 left-0 h-[1px] bg-accent"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={linkHoverVariants}
              />
            </Link>
            <Link
              href="#"
              className="text-secondary hover:text-foreground transition-colors text-sm relative overflow-hidden"
            >
              Sitemap
              <motion.span 
                className="absolute bottom-0 left-0 h-[1px] bg-accent"
                initial="rest"
                whileHover="hover"
                animate="rest"
                variants={linkHoverVariants}
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <a
          href="#home"
          className="w-12 h-12 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-accent/20 hover:bg-accent transition-all duration-300 border border-accent/20"
          aria-label="Back to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </a>
      </motion.div>
    </footer>
  );
} 