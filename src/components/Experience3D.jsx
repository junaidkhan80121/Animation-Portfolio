import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Stars } from '@react-three/drei';
import { ScrollScene } from './ScrollScene';

export const Experience3D = ({ theme }) => {
  const isDark = theme === 'dark';
  
  const bgColor = isDark ? '#050810' : '#f8fafc';
  const fogColor = isDark ? '#050810' : '#e2e8f0';
  
  // Highlighting dynamic colors for light vs dark
  const dirLightColors = isDark ? ['#3b82f6', '#e879f9', '#60a5fa'] : ['#fb923c', '#2dd4bf', '#818cf8'];

  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 45 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: bgColor, transition: 'background-color 0.5s ease' }}
    >
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" args={[fogColor, 5, 40]} />
      
      {/* Cinematic Lighting Adjustments per Theme */}
      <ambientLight intensity={isDark ? 0.3 : 1.5} color={isDark ? "#1e3a8a" : "#ffffff"} />
      <directionalLight position={[10, 20, 5]} intensity={isDark ? 1.5 : 2} color={dirLightColors[0]} />
      <pointLight position={[-10, -5, -15]} intensity={isDark ? 1.5 : 0.8} color={dirLightColors[1]} />
      <pointLight position={[10, 5, -25]} intensity={isDark ? 1 : 0.5} color={dirLightColors[2]} />

      {/* Atmospheric Particles resembling deep space or bright sunlight dust */}
      <Stars 
        radius={100} depth={50} count={isDark ? 5000 : 1500} 
        factor={isDark ? 4 : 2} saturation={0} fade speed={1} 
        color={isDark ? "#ffffff" : "#475569"} 
      />
      
      {/* Scroll controls sync the virtual playhead to user scroll */}
      <ScrollControls pages={5} damping={0.2}>
        <ScrollScene theme={theme} />
      </ScrollControls>
    </Canvas>
  );
};
