"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, Variants } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  // Smooth cursor effect with lerp
  const smoothMouseMove = useCallback(() => {
    if (!cursorRef.current || !followerRef.current) return;
    
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };
    
    let currentX = parseFloat(cursorRef.current.style.transform.split("translateX(")[1]) || 0;
    let currentY = parseFloat(cursorRef.current.style.transform.split("translateY(")[1]) || 0;
    
    if (isNaN(currentX)) currentX = mousePosition.x;
    if (isNaN(currentY)) currentY = mousePosition.y;
    
    const nextX = lerp(currentX, mousePosition.x, 0.2);
    const nextY = lerp(currentY, mousePosition.y, 0.2);
    
    cursorRef.current.style.transform = `translateX(${nextX}px) translateY(${nextY}px)`;
    
    requestRef.current = requestAnimationFrame(smoothMouseMove);
  }, [mousePosition]);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    
    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);
    
    requestRef.current = requestAnimationFrame(smoothMouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
      
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePosition, smoothMouseMove]);

  const variants: Variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      height: 20,
      width: 20,
      backgroundColor: "var(--accent)",
      mixBlendMode: "difference" as const,
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 30,
      },
    },
    hover: {
      height: 60,
      width: 60,
      x: mousePosition.x,
      y: mousePosition.y,
      mixBlendMode: "difference" as const,
      backgroundColor: "var(--accent)",
      transition: {
        type: "spring",
        mass: 0.2,
        stiffness: 600,
        damping: 30,
      },
    },
    clicking: {
      height: 16,
      width: 16,
      x: mousePosition.x,
      y: mousePosition.y,
      backgroundColor: "#ffffff",
      transition: {
        type: "spring",
        mass: 0.1,
        stiffness: 800,
        damping: 30,
      },
    },
    text: {
      height: 100,
      width: 100,
      opacity: 0.2,
      x: mousePosition.x,
      y: mousePosition.y,
      backgroundColor: "var(--accent)",
      mixBlendMode: "normal" as const,
      transition: {
        type: "spring",
        mass: 0.3,
        stiffness: 400,
        damping: 20,
      },
    },
  };

  const followerVariants: Variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y,
      height: 40,
      width: 40,
      opacity: 0.3,
      borderColor: "var(--foreground)",
      transition: {
        type: "spring",
        mass: 0.6,
        stiffness: 200,
        damping: 30,
        delay: 0.03,
      },
    },
    hover: {
      height: 80,
      width: 80,
      opacity: 0.4,
      x: mousePosition.x,
      y: mousePosition.y,
      borderColor: "var(--accent)",
      transition: {
        type: "spring",
        mass: 0.6,
        stiffness: 200,
        damping: 30,
      },
    },
    clicking: {
      height: 36,
      width: 36,
      opacity: 0.6,
      x: mousePosition.x,
      y: mousePosition.y,
      borderColor: "#ffffff",
      transition: {
        type: "spring",
        mass: 0.6,
        stiffness: 200,
        damping: 30,
      },
    },
    text: {
      height: 120,
      width: 120,
      opacity: 0.1,
      x: mousePosition.x,
      y: mousePosition.y,
      borderColor: "var(--accent)",
      transition: {
        type: "spring",
        mass: 0.8,
        stiffness: 150,
        damping: 30,
        delay: 0.07,
      },
    },
  };

  useEffect(() => {
    const handleLinkHoverIn = () => setCursorVariant("hover");
    const handleLinkHoverOut = () => setCursorVariant("default");
    const handleTextHoverIn = () => setCursorVariant("text");
    const handleTextHoverOut = () => setCursorVariant("default");

    const links = document.querySelectorAll("a, button, .hover-target");
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, .text-target");
    
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleLinkHoverIn);
      link.addEventListener("mouseleave", handleLinkHoverOut);
    });
    
    headings.forEach((heading) => {
      heading.addEventListener("mouseenter", handleTextHoverIn);
      heading.addEventListener("mouseleave", handleTextHoverOut);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleLinkHoverIn);
        link.removeEventListener("mouseleave", handleLinkHoverOut);
      });
      
      headings.forEach((heading) => {
        heading.removeEventListener("mouseenter", handleTextHoverIn);
        heading.removeEventListener("mouseleave", handleTextHoverOut);
      });
    };
  }, []);

  // Determine the active variant
  const activeVariant = isClicking ? "clicking" : cursorVariant;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="cursor hidden md:block"
        variants={variants}
        animate={activeVariant}
        style={{transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`}}
      />
      <motion.div
        ref={followerRef}
        className="cursor-follower hidden md:block"
        variants={followerVariants}
        animate={activeVariant}
      />
    </>
  );
};

export default CustomCursor; 