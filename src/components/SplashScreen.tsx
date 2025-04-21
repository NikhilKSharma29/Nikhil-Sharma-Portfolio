"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showScreen, setShowScreen] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    const timer = setTimeout(() => {
      setShowScreen(false);
      setTimeout(onComplete, 1000); // Allow exit animation to complete
    }, 3000); // Show splash for 3 seconds

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);

  // Split text animation for "Welcome"
  const welcomeText = "WELCOME";
  
  return (
    <AnimatePresence mode="wait">
      {showScreen && (
        <motion.div
          className="fixed inset-0 bg-background flex flex-col items-center justify-center z-[100] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1] 
            }
          }}
        >
          {/* Animated circles background */}
          <div className="absolute inset-0 z-0">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-accent/5"
                initial={{ 
                  width: `${Math.random() * 300 + 100}px`, 
                  height: `${Math.random() * 300 + 100}px`,
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: 0
                }}
                animate={{ 
                  opacity: 0.3,
                  scale: [1, 1.2, 1],
                  rotate: [0, 90]
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "linear",
                  delay: i * 0.5
                }}
              />
            ))}
          </div>

          {/* Logo animation */}
          <motion.div 
            className="mb-12 relative"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 10
            }}
          >
            <div className="w-24 h-24 rounded-full border-4 border-accent flex items-center justify-center">
              <motion.span 
                className="text-4xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                N
              </motion.span>
            </div>
          </motion.div>

          <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center z-10">
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="flex justify-center mb-6">
                  {welcomeText.split('').map((letter, index) => (
                    <motion.span
                      key={index}
                      className="text-6xl md:text-8xl font-bold"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        color: index % 2 === 0 ? 'var(--foreground)' : 'var(--accent)'
                      }}
                      transition={{
                        duration: 0.6,
                        delay: 0.5 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
            
            <div className="mt-6 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.5,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                className="text-lg text-secondary"
              >
                to Nikhil Sharma&apos;s Portfolio
              </motion.div>
            </div>
            
            <motion.div
              className="mt-12 w-full max-w-md"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              <div className="h-1 bg-tertiary rounded-full w-full overflow-hidden">
                <motion.div
                  className="h-full bg-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{
                    ease: "easeInOut",
                  }}
                />
              </div>
              <div className="mt-2 text-xs text-secondary text-right">
                {Math.round(progress)}%
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 