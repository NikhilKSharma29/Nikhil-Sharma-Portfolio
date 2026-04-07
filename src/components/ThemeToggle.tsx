"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Wait for component to mount to access theme (to avoid hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Only render toggle on client to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-tertiary/50 backdrop-blur-sm border border-foreground/10 opacity-0" />
    );
  }

  const isDarkMode = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const sunVariants = {
    initial: { scale: 0.6, rotate: 0 },
    animate: { scale: 1, rotate: 360, transition: { duration: 0.5, type: "spring" } },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  const moonVariants = {
    initial: { scale: 0.6, rotate: 0 },
    animate: { scale: 1, rotate: -360, transition: { duration: 0.5, type: "spring" } },
    hover: { scale: 1.1, transition: { duration: 0.2 } }
  };

  return (
    <motion.button
      aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-tertiary/50 backdrop-blur-sm border border-foreground/10 transition-colors duration-300"
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isDarkMode ? (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={sunVariants}
          className="text-foreground"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </motion.svg>
      ) : (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="initial"
          animate="animate"
          whileHover="hover"
          variants={moonVariants}
          className="text-foreground"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </motion.svg>
      )}
    </motion.button>
  );
};

export default ThemeToggle; 