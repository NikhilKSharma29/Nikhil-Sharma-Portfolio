"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import ThreeBackground from "./ThreeBackground";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 10;
      const y = (clientY / window.innerHeight - 0.5) * 10;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Animation for the first name
    if (titleRef.current) {
      const chars = titleRef.current.querySelectorAll('.char');
      
      gsap.from(chars, {
        opacity: 0,
        y: 100,
        rotateX: -90,
        stagger: 0.04,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5
      });
    }
    
    // Parallax effect
    if (sectionRef.current) {
      const heroContent = sectionRef.current.querySelector('.hero-content');
      
      gsap.to(heroContent, {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Split text helper function
  const SplitText = ({ children, className }: { children: string, className?: string }) => {
    return (
      <span className={className}>
        {children.split('').map((char, index) => (
          <span key={index} className="char inline-block">
            {char}
          </span>
        ))}
      </span>
    );
  };

  return (
    <section 
      id="home" 
      ref={sectionRef}
      className="hero-section relative h-screen w-full overflow-hidden"
    >
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <ThreeBackground />
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background z-10"></div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="grid-bg h-full w-full">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="grid-line-h"></div>
          ))}
          {[...Array(20)].map((_, i) => (
            <div key={i} className="grid-line-v"></div>
          ))}
        </div>
      </div>
      
      <motion.div
        style={{ y, opacity }}
        className="container relative z-20 mx-auto h-full flex flex-col justify-center px-4"
      >
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-accent font-mono mb-6 flex items-center"
          >
            <span className="inline-block h-[1px] w-8 bg-accent mr-4"></span>
            <span className="uppercase text-sm tracking-widest">Full-Stack Developer</span>
          </motion.div>
          
          <div className="mb-4 relative perspective">
            <motion.h1
              ref={titleRef}
              className="text-7xl md:text-[8rem] lg:text-[15rem] font-bold uppercase leading-none tracking-tighter mb-4 text-shadow-3d"
              style={{
                textShadow: `${mousePosition.x * 0.05}px ${mousePosition.y * 0.05}px 0px rgba(121, 40, 202, 0.4)`,
                transform: `rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg)`
              }}
            >
              <SplitText>Nikhil</SplitText>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-7xl md:text-[8rem] lg:text-[15rem] font-bold uppercase leading-none tracking-tighter text-shadow-3d"
              style={{
                textShadow: `${mousePosition.x * 0.07}px ${mousePosition.y * 0.07}px 0px rgba(121, 40, 202, 0.3)`,
                transform: `rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              Sharma
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-col gap-4 mt-10 md:flex-row md:items-center md:gap-12"
          >
            <div className="flex items-center">
              <span className="inline-block h-[1px] w-10 bg-secondary mr-4"></span>
              <p className="text-secondary text-lg">
                Creating digital <span className="text-accent">experiences</span>
              </p>
            </div>
            
            <div className="flex items-center gap-8 mt-8 md:mt-0">
              <a 
                href="#contact" 
                className="text-sm font-medium text-secondary hover:text-foreground transition-colors duration-300 group flex items-center gap-2"
              >
                <span>Contact</span>
                <span className="inline-block w-5 h-[1px] bg-secondary group-hover:w-10 group-hover:bg-foreground transition-all duration-300"></span>
              </a>
              <a 
                href="#projects" 
                className="text-sm font-medium text-secondary hover:text-foreground transition-colors duration-300 group flex items-center gap-2"
              >
                <span>Projects</span>
                <span className="inline-block w-5 h-[1px] bg-secondary group-hover:w-10 group-hover:bg-foreground transition-all duration-300"></span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm uppercase tracking-widest mb-3 text-secondary">Scroll to explore</span>
          <div className="scroll-indicator"></div>
        </div>
      </motion.div>
      
      {/* Floating shapes */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-shape absolute w-[300px] h-[300px] rounded-full bg-accent/5 backdrop-blur-3xl"
            animate={{
              x: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
              y: [Math.random() * 100, Math.random() * -100, Math.random() * 100],
              rotate: [0, 360],
              scale: [0.8 + Math.random() * 0.5, 1 + Math.random() * 0.5, 0.8 + Math.random() * 0.5],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              opacity: 0.3 + Math.random() * 0.2,
            }}
          />
        ))}
      </div>
      
      {/* Add a custom style tag to the document to avoid having to modify global CSS */}
      <style jsx global>{`
        .perspective {
          perspective: 1000px;
          transform-style: preserve-3d;
        }
        .text-shadow-3d {
          text-shadow: 0 1px 0 rgb(121 40 202 / 30%),
                       0 2px 0 rgb(121 40 202 / 25%),
                       0 3px 0 rgb(121 40 202 / 20%),
                       0 4px 0 rgb(121 40 202 / 15%),
                       0 5px 0 rgb(121 40 202 / 10%);
          transform-style: preserve-3d;
          transition: transform 0.3s ease;
        }
        
        .grid-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .grid-line-h, .grid-line-v {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.05);
        }
        
        .grid-line-h {
          height: 1px;
          width: 100%;
        }
        
        .grid-line-v {
          width: 1px;
          height: 100%;
        }
        
        .grid-line-h:nth-child(5n) {
          background-color: rgba(121, 40, 202, 0.1);
        }
        
        .grid-line-v:nth-child(5n) {
          background-color: rgba(121, 40, 202, 0.1);
        }
        
        ${[...Array(20)].map((_, i) => `
          .grid-line-h:nth-child(${i + 1}) {
            top: ${(i + 1) * 5}%;
          }
          
          .grid-line-v:nth-child(${i + 1}) {
            left: ${(i + 1) * 5}%;
          }
        `).join('')}
      `}</style>
    </section>
  );
} 