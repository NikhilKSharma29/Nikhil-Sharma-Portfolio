"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const particlesMaterialRef = useRef<THREE.ShaderMaterial | null>(null);
  const smallParticlesRef = useRef<THREE.Points | null>(null);
  const smallParticlesMaterialRef = useRef<THREE.PointsMaterial | null>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Ensure client-side only execution to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !mounted) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 350;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    
    // Determine colors based on theme
    const isDarkTheme = resolvedTheme === 'dark';
    const primaryColor = isDarkTheme ? [0.8, 0.3, 1.0] : [0.6, 0.2, 0.8];
    const secondaryColor = isDarkTheme ? [0.4, 0.1, 0.6] : [0.4, 0.1, 0.5];
    const smallParticleColor = isDarkTheme ? 0xffffff : 0x555555;
    
    // Custom shader for particles
    const particleVertexShader = `
      attribute float aScale;
      attribute float aRandomness;
      
      uniform float uTime;
      uniform float uSize;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      
      varying vec3 vColor;
      
      void main() {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        
        // Oscillate particles
        float angle = uTime * 0.5 + aRandomness * 10.0;
        modelPosition.y += sin(angle) * aRandomness * 10.0;
        modelPosition.x += cos(angle) * aRandomness * 5.0;
        
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
        
        gl_Position = projectedPosition;
        
        // Size attenuation
        gl_PointSize = uSize * aScale * (1.0 / -viewPosition.z);
        
        // Color based on position
        vColor = vec3(
          uColorA.r + 0.5 * sin(position.x * 0.01 + uTime),
          uColorA.g + 0.3 * sin(position.y * 0.01 + uTime * 0.5),
          uColorA.b + 0.2 * sin(position.z * 0.01 + uTime * 0.2)
        );
      }
    `;
    
    const particleFragmentShader = `
      uniform vec3 uColorB;
      varying vec3 vColor;
      
      void main() {
        // Create circular particle
        float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
        float strength = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
        
        // Color with gradient
        vec3 finalColor = mix(uColorB, vColor, strength);
        
        // Add glow
        gl_FragColor = vec4(finalColor, strength * 0.8);
      }
    `;
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 2500;
    
    const positionArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);
    const randomnessArray = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Position in sphere
      const radius = 500 * Math.pow(Math.random(), 1.5);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positionArray[i] = radius * Math.sin(phi) * Math.cos(theta);     // x
      positionArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
      positionArray[i + 2] = radius * Math.cos(phi);                   // z
      
      // Scale
      scaleArray[i / 3] = Math.random() * 2.0;
      
      // Randomness for animation
      randomnessArray[i / 3] = Math.random();
    }
    
    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positionArray, 3)
    );
    particlesGeometry.setAttribute(
      "aScale",
      new THREE.BufferAttribute(scaleArray, 1)
    );
    particlesGeometry.setAttribute(
      "aRandomness",
      new THREE.BufferAttribute(randomnessArray, 1)
    );
    
    // Custom shader material
    const particlesMaterial = new THREE.ShaderMaterial({
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 8.0 },
        uColorA: { value: new THREE.Vector3(...primaryColor) },
        uColorB: { value: new THREE.Vector3(...secondaryColor) }
      }
    });
    particlesMaterialRef.current = particlesMaterial;
    
    // Create points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    particlesRef.current = particles;
    scene.add(particles);
    
    // Second particle system for depth
    const smallParticlesGeometry = new THREE.BufferGeometry();
    const smallParticleCount = 1000;
    
    const smallPositionArray = new Float32Array(smallParticleCount * 3);
    
    for (let i = 0; i < smallParticleCount * 3; i += 3) {
      smallPositionArray[i] = (Math.random() - 0.5) * 2000;
      smallPositionArray[i + 1] = (Math.random() - 0.5) * 2000;
      smallPositionArray[i + 2] = (Math.random() - 0.5) * 2000;
    }
    
    smallParticlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(smallPositionArray, 3)
    );
    
    const smallParticlesMaterial = new THREE.PointsMaterial({
      size: 1,
      sizeAttenuation: true,
      color: smallParticleColor,
      transparent: true,
      opacity: isDarkTheme ? 0.4 : 0.2,
    });
    smallParticlesMaterialRef.current = smallParticlesMaterial;
    
    const smallParticles = new THREE.Points(smallParticlesGeometry, smallParticlesMaterial);
    smallParticlesRef.current = smallParticles;
    scene.add(smallParticles);
    
    // Mouse interaction
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      speed: 0.1
    };
    
    const handleMouseMove = (event: MouseEvent) => {
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Animation loop
    const clock = new THREE.Clock();
    
    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      
      // Update uniforms
      particlesMaterial.uniforms.uTime.value = elapsedTime;
      
      // Smooth mouse movement
      mouse.x += (mouse.targetX - mouse.x) * mouse.speed;
      mouse.y += (mouse.targetY - mouse.y) * mouse.speed;
      
      // Apply to particle system
      particles.rotation.y = elapsedTime * 0.05 + mouse.x * 0.5;
      particles.rotation.x = mouse.y * 0.5;
      
      smallParticles.rotation.y = -elapsedTime * 0.02;
      smallParticles.rotation.x = -elapsedTime * 0.01;
      
      // Responsive particle size
      const size = Math.min(window.innerWidth, window.innerHeight) / 500;
      particlesMaterial.uniforms.uSize.value = Math.max(size, 2);
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      scene.remove(particles);
      scene.remove(smallParticles);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      smallParticlesGeometry.dispose();
      smallParticlesMaterial.dispose();
      renderer.dispose();
    };
  }, [mounted]);

  // Update colors when theme changes
  useEffect(() => {
    if (!mounted || !particlesMaterialRef.current || !smallParticlesMaterialRef.current) return;
    
    const isDarkTheme = resolvedTheme === 'dark';
    const primaryColor = isDarkTheme ? [0.8, 0.3, 1.0] : [0.6, 0.2, 0.8];
    const secondaryColor = isDarkTheme ? [0.4, 0.1, 0.6] : [0.4, 0.1, 0.5];
    const smallParticleColor = isDarkTheme ? 0xffffff : 0x555555;
    
    particlesMaterialRef.current.uniforms.uColorA.value = new THREE.Vector3(...primaryColor);
    particlesMaterialRef.current.uniforms.uColorB.value = new THREE.Vector3(...secondaryColor);
    smallParticlesMaterialRef.current.color.set(smallParticleColor);
    smallParticlesMaterialRef.current.opacity = isDarkTheme ? 0.4 : 0.2;
  }, [resolvedTheme, mounted]);
  
  if (!mounted) {
    return <div className="w-full h-full bg-background" />;
  }
  
  return <div ref={containerRef} className="w-full h-full" />;
} 