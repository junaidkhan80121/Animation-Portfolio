import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TopDownCar = () => (
  // 0 degrees points RIGHT
  <svg 
    width="120" 
    height="60" 
    viewBox="0 0 100 50" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))' }}
  >
    {/* Tires */}
    <rect x="15" y="-2" width="22" height="12" rx="4" fill="#111" />
    <rect x="65" y="-2" width="22" height="12" rx="4" fill="#111" />
    <rect x="15" y="40" width="22" height="12" rx="4" fill="#111" />
    <rect x="65" y="40" width="22" height="12" rx="4" fill="#111" />
    
    {/* Body chassis shadow/outline */}
    <rect x="10" y="5" width="80" height="40" rx="10" fill="#2563eb" />
    
    {/* Windshield */}
    <path d="M 60 10 L 72 12 L 72 38 L 60 40 Z" fill="#93c5fd" opacity="0.9"/>
    
    {/* Rear window */}
    <path d="M 30 12 L 20 12 L 15 25 L 20 38 L 30 38 Z" fill="#93c5fd" opacity="0.9"/>
    
    {/* Roof */}
    <rect x="35" y="12" width="22" height="26" rx="5" fill="#1d4ed8" />
    
    {/* Headlights glow */}
    <circle cx="85" cy="12" r="6" fill="#fef08a" opacity="0.6" filter="blur(2px)" />
    <circle cx="85" cy="38" r="6" fill="#fef08a" opacity="0.6" filter="blur(2px)" />
    <circle cx="86" cy="12" r="3" fill="#ffffff" />
    <circle cx="86" cy="38" r="3" fill="#ffffff" />
    
    {/* Tail lights */}
    <rect x="10" y="8" width="4" height="10" rx="2" fill="#ef4444" />
    <rect x="10" y="32" width="4" height="10" rx="2" fill="#ef4444" />
    <rect x="9" y="8" width="6" height="10" rx="3" fill="#ef4444" opacity="0.5" filter="blur(2px)" />
    <rect x="9" y="32" width="6" height="10" rx="3" fill="#ef4444" opacity="0.5" filter="blur(2px)" />
  </svg>
);

export const AnimatedBackground = ({ scrollYProgress }) => {
  // Map horizontal progress: 10vw -> 80vw -> 10vw -> 80vw -> off-screen
  const leftX = '10vw';
  const rightX = '80vw';
  
  const x = useTransform(
    scrollYProgress,
    [0, 0.2, 0.25, 0.3,   0.5, 0.55, 0.6,   0.8, 1.0],
    [leftX, rightX, '90vw', rightX,  leftX, '0vw', leftX,  rightX, '120vw']
  );
  
  // Map vertical progress: step down at each end
  const topY = '15vh';
  const midY = '45vh';
  const botY = '75vh';
  const finishY = '95vh';

  const y = useTransform(
    scrollYProgress,
    [0, 0.2, 0.25, 0.3,   0.5, 0.55, 0.6,   0.8, 1.0],
    [topY, topY, '30vh', midY,  midY, '60vh', botY, botY, finishY]
  );
  
  // Rotate smoothly making U-turns
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.2, 0.25, 0.3,   0.5, 0.55, 0.6,   0.8, 1.0],
    [0, 0, 90, 180,       180, 90, 0,       0, 45]
  );

  return (
    <div className="background-container">
      {/* Keeping some ambient dark shapes for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#111827_0%,_var(--bg-color)_100%)]"></div>
      
      {/* The Car */}
      <motion.div 
        style={{ 
          x, 
          y, 
          rotate, 
          position: 'absolute', 
          top: 0, 
          left: 0,
          originX: 0.5, 
          originY: 0.5,
          marginTop: '-30px', /* half of car height to center the path */
          marginLeft: '-60px' /* half of car width */
        }}
        className="z-0"
      >
        <TopDownCar />
      </motion.div>
    </div>
  );
};
