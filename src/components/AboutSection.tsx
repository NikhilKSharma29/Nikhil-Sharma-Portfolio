"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import profileImage from "../Images/profile.png";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState<string>("story");

  // Animation variants
  const tabContentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const tabs = [
    { id: "story", label: "My Story" },
    { id: "approach", label: "My Approach" },
    { id: "values", label: "Core Values" },
  ];

  const tabContent = {
    story: (
      <>
        <p className="text-lg leading-relaxed mb-6 text-justify">
          I'm a passionate full-stack developer who loves crafting beautiful, functional, and user-centered digital experiences. My journey in web development began with a fascination for how design and technology intersect to create compelling user interfaces.
        </p>
        
        <p className="text-lg leading-relaxed mb-6 text-justify">
          Throughout my career, I've collaborated with talented teams to deliver projects for my clients, from startups to established enterprises. My approach combines creative problem-solving with technical expertise to build solutions that not only meet but exceed client expectations.
        </p>
        
        <p className="text-lg leading-relaxed text-justify">
          As technology continues to evolve, I remain committed to staying at the forefront of industry trends and best practices, constantly refining my skills to deliver cutting-edge web experiences that stand out.
        </p>
        <div className="text-lg leading-relaxed mb-6 pl-0 mt-6 flex items-start space-x-4 text-justify">
          <div className="p-3 bg-accent/10 rounded-lg flex-shrink-0 mt-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
          </div>
          <div className="text-left">
            <div className="font-medium">Bachelor of Computer Application</div>
            <div className="text-secondary">Medi-caps University • 2020-2023</div>
          </div>
        </div>
        
      </>
    ),
    approach: (
      <>
        <p className="text-lg leading-relaxed mb-6 text-justify">
          My development philosophy centers on three key principles: attention to detail, user-centered design, and performance optimization. I believe that the best digital experiences are those that seamlessly blend visual appeal with technical excellence.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-justify">
          For every project, I start by gaining a deep understanding of the user's needs and business objectives. This foundation guides the entire development process, ensuring that every decision contributes to creating a product that not only looks beautiful but also functions flawlessly.
        </p>
        <p className="text-lg leading-relaxed text-justify">
          I'm particularly passionate about creating responsive, accessible, and performant websites that provide exceptional experiences across all devices and for all users, regardless of their abilities.
        </p>
      </>
    ),
    values: (
      <>
        <p className="text-lg leading-relaxed mb-6 text-justify">
          <span className="font-medium text-accent">Innovation:</span> I embrace new technologies and approaches, constantly pushing boundaries to create forward-thinking solutions.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-justify">
          <span className="font-medium text-accent">Collaboration:</span> I believe the best results come from open communication and teamwork, valuing diverse perspectives and expertise.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-justify">
          <span className="font-medium text-accent">Quality:</span> I maintain high standards in every aspect of my work, from clean code to polished interfaces.
        </p>
        <p className="text-lg leading-relaxed text-justify">
          <span className="font-medium text-accent">Continuous Learning:</span> I'm dedicated to growing professionally, constantly expanding my skills and knowledge base.
        </p>
      </>
    ),
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section bg-background relative py-24 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-[80px] -z-10" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section heading */}
          <motion.div 
            className="mb-16 overflow-hidden text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground via-accent to-foreground">
              About Me
            </h2>
            <p className="text-secondary mt-6 max-w-2xl mx-auto text-lg">
              Passionate full-stack developer creating beautiful, user-friendly, and innovative digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Profile image - left column */}
            <motion.div 
              className="lg:col-span-5 flex flex-col items-center"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative w-full aspect-[3/4] max-w-sm rounded-2xl overflow-hidden">
                <Image 
                  src={profileImage} 
                  alt="Your profile picture"
                  fill
                  className="object-cover rounded-2xl brightness-[1.02] contrast-[1.05] saturate-[0.95]"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-tertiary/20 opacity-70 mix-blend-color-burn pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-transparent to-accent/10 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 border border-tertiary/30 rounded-2xl pointer-events-none"></div>
              </div>
            </motion.div>

            {/* Content - right column */}
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              {/* Tabs */}
              <div className="flex mb-8 border-b border-tertiary/30 pb-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-2 font-medium text-sm transition-colors duration-300 relative ${
                      activeTab === tab.id 
                        ? "text-accent" 
                        : "text-secondary hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div 
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-accent -mb-2"
                        layoutId="activeTab"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={tabContentVariants}
                  className="text-secondary"
                >
                  {tabContent[activeTab as keyof typeof tabContent]}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}