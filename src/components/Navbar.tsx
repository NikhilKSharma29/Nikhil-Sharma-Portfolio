"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      opacity: 0,
      clipPath: "circle(30px at calc(100% - 45px) 45px)",
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
        delay: 0.1,
      }
    },
    open: {
      opacity: 1,
      clipPath: "circle(2000px at calc(100% - 45px) 45px)",
      transition: {
        duration: 0.75,
        ease: [0.76, 0, 0.24, 1],
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: -50 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const menuFooterVariants = {
    closed: { opacity: 0, y: 50 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const navLinkHoverVariants = {
    rest: { width: 0 },
    hover: { width: "100%", transition: { duration: 0.3, ease: "easeInOut" } }
  };

  const menuItems = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Work", href: "#works" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" }
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/NikhilKSharma29" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/nikhil-sharma-0aa597339" },
    { name: "Instagram", url: "https://www.instagram.com/nikhilksharmaa?igsh=cmVudmc4czUxb3oz" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'py-4 bg-background/70 backdrop-blur-lg border-b border-foreground/10' 
          : 'py-6 bg-transparent'
      }`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-foreground text-xl md:text-2xl font-bold relative overflow-hidden group">
            <span className="relative z-10">Nikhil.</span>
            <motion.span 
              className="absolute bottom-0 left-0 h-[2px] bg-accent opacity-70"
              initial="rest"
              animate="rest"
              whileHover="hover"
              variants={navLinkHoverVariants}
            />
          </Link>

          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              <Link 
                href="#contact"
                className="text-secondary hover:text-foreground transition-colors duration-300 relative overflow-hidden group"
              >
                <motion.span 
                  className="absolute bottom-0 left-0 h-[2px] bg-accent opacity-70"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  variants={navLinkHoverVariants}
                />
              </Link>
            </div>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              
              <button
                aria-label="Toggle Menu"
                className="relative flex flex-col justify-center items-center group"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-tertiary/30 backdrop-blur-sm border border-foreground/10 overflow-hidden">
                  <div className={`w-5 h-0.5 bg-foreground transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`} />
                  <div className={`w-5 h-0.5 bg-foreground transition-all duration-300 mt-1 ${isOpen ? '-rotate-45 -translate-y-0.5' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-background/95 backdrop-blur-lg z-40 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="container mx-auto px-4 flex flex-col justify-center h-full">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12 h-full py-16">
                <div className="md:col-span-3 flex items-center">
                  <ul className="space-y-6 md:space-y-8">
                    {menuItems.map((item, i) => (
                      <motion.li 
                        key={item.name} 
                        custom={i}
                        variants={menuItemVariants}
                        onMouseEnter={() => setHoveredItem(i)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <Link
                          href={item.href}
                          className="inline-block text-4xl md:text-6xl lg:text-7xl font-bold transition-colors duration-300 relative group"
                          onClick={() => setIsOpen(false)}
                        >
                          <motion.span 
                            className={hoveredItem === i ? "text-accent" : "text-foreground"}
                            animate={{ y: hoveredItem === i ? -5 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {item.name}
                          </motion.span>
                          <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-accent transition-all duration-500 group-hover:w-full"></span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                
                <motion.div 
                  className="md:col-span-2 flex flex-col justify-end md:justify-center"
                  variants={menuFooterVariants}
                >
                  <div className="border-t border-tertiary pt-6 mt-auto">
                    <p className="text-secondary mb-6">Get in touch</p>
                    <a 
                      href="mailto:hello@rasulakhundov.com" 
                      className="text-2xl md:text-3xl font-medium hover:text-accent transition-colors duration-300"
                    >
                      sharmanikhil2188@gmail.com
                    </a>
                    
                    <div className="mt-12">
                      <p className="text-secondary mb-4">Follow me</p>
                      <div className="flex gap-6">
                        {socialLinks.map(link => (
                          <a 
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-foreground hover:text-accent transition-colors duration-300"
                          >
                            {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 