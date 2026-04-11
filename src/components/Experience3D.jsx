import React from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Stars } from '@react-three/drei';
import { ScrollScene } from './ScrollScene';

export const Experience3D = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 45 }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: '#050810' }}
    >
      <color attach="background" args={['#050810']} />
      <fog attach="fog" args={['#050810', 5, 40]} />
      
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.3} color="#1e3a8a" />
      <directionalLight position={[10, 20, 5]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-10, -5, -15]} intensity={1.5} color="#e879f9" />
      <pointLight position={[10, 5, -25]} intensity={1} color="#60a5fa" />

      {/* Atmospheric Particles resembling deep space or underwater dust */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Scroll controls sync the virtual playhead to user scroll */}
      <ScrollControls pages={5} damping={0.2}>
        <ScrollScene />
      </ScrollControls>
    </Canvas>
  );
};
