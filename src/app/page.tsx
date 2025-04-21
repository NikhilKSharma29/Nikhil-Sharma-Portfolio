"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";
import CoreStackSection from "@/components/CoreStackSection";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Prevent scroll while splash screen is shown
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  return (
    <main>
      {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      <div style={{ 
        opacity: loading ? 0 : 1, 
        transition: 'opacity 0.8s ease-in-out',
        visibility: loading ? 'hidden' : 'visible'
      }}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CoreStackSection />
        <ContactSection />
      </div>
    </main>
  );
}
