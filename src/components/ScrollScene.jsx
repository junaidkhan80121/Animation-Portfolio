import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Float, Text, RoundedBox, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export function LaptopModel({ isDark }) {
  const metalColor = isDark ? "#4b5563" : "#cbd5e1"; 
  
  return (
    <group position={[0, -0.5, 0]}>
      <RoundedBox args={[3.2, 0.1, 2.2]} radius={0.04} smoothness={4} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial color={metalColor} metalness={0.9} roughness={0.3} />
      </RoundedBox>
      <RoundedBox args={[2.8, 0.05, 1.1]} radius={0.01} smoothness={2} position={[0, 0.04, -0.3]}>
        <meshStandardMaterial color={isDark ? "#111827" : "#334155"} roughness={0.8} metalness={0.2} />
      </RoundedBox>
      <RoundedBox args={[1.2, 0.02, 0.7]} radius={0.02} smoothness={2} position={[0, 0.06, 0.65]}>
        <meshStandardMaterial color={isDark ? "#374151" : "#94a3b8"} metalness={0.6} roughness={0.4} />
      </RoundedBox>
      <group position={[0, 0.05, -1.05]} rotation={[-0.15, 0, 0]}>
        <RoundedBox args={[3.2, 2.1, 0.08]} radius={0.04} smoothness={4} position={[0, 1.05, -0.04]}>
          <meshStandardMaterial color={metalColor} metalness={0.9} roughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[3.1, 2, 0.01]} radius={0.02} smoothness={4} position={[0, 1.05, 0.01]}>
          <meshStandardMaterial color="#000000" metalness={1} roughness={0.1} />
        </RoundedBox>
        <mesh position={[0, 1.05, 0.016]}>
          <planeGeometry args={[2.9, 1.8]} />
          <meshBasicMaterial color={isDark ? "#1d4ed8" : "#38bdf8"} />
        </mesh>
      </group>
    </group>
  );
}

export const ScrollScene = ({ theme }) => {
  const isDark = theme === 'dark';
  const scroll = useScroll();

  // Igloo style "Ice Cubes" / Monoliths 
  const cubes = useMemo(() => {
    const items = [];
    for (let i = 0; i < 70; i++) {
        // Form a massive endless cavern
        const x = (Math.random() - 0.5) * 60;
        const y = (Math.random() - 0.5) * 60;
        const z = -Math.random() * 600 - 5; 
        items.push({ position: [x, y, z], scale: 1 + Math.random() * 4 });
    }
    return items;
  }, []);

  useFrame((state) => {
    const offset = scroll.offset; 
    
    // IGLOO Cinematic Dive: CAMERA FLIES FORWARD along Z axis 
    const cameraZ = -offset * 600; 
    
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, cameraZ + 15, 0.05); // Smooth pursuit
    
    // Cinematic camera bob and sway (organic human/drifting feeling)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, Math.sin(offset * Math.PI * 8) * 4, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, Math.cos(offset * Math.PI * 6) * 3 + 2, 0.05);
    
    state.camera.lookAt(
      state.camera.position.x + Math.sin(offset * Math.PI * 4) * 0.5, 
      state.camera.position.y, 
      cameraZ - 50
    );
  });

  return (
    <>
      <Sparkles count={1500} scale={200} size={5} speed={0.4} opacity={isDark ? 0.3 : 0.6} color={isDark ? "#ffffff" : "#1e40af"} />

      {/* The Laptop rests statically in space as a hero opening piece as we plunge past it */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <group position={[0, -2, -5]} rotation={[0.2, -0.4, 0]}>
           <LaptopModel isDark={isDark} />
        </group>
      </Float>

      {/* Extreme Cinematic Typography mapping exactly with the Camera Dive */}
      <group>
         <Text position={[0, 4, -25]} fontSize={10} color={isDark ? "#ffffff" : "#020617"} anchorX="center" anchorY="middle" letterSpacing={0.1}>
            FULL STACK
         </Text>

         <Text position={[-6, 6, -120]} fontSize={7} color={isDark ? "#3b82f6" : "#2563eb"} anchorX="left">
            DOM MASTERY
         </Text>
         <Text position={[-6, 0, -120]} fontSize={3} color={isDark ? "#94a3b8" : "#475569"} maxWidth={20} anchorX="left">
            React / WebGL / Node / System Architecture. Highly optimized rendering infrastructures engineered for absolute absolute performance.
         </Text>
         
         <Text position={[6, -2, -240]} fontSize={7} color={isDark ? "#e879f9" : "#c026d3"} anchorX="right">
            EXPERIENCE
         </Text>
         <Text position={[6, -6, -240]} fontSize={3} color={isDark ? "#94a3b8" : "#475569"} maxWidth={20} anchorX="right" textAlign="right">
            Vast historical exposure to deploying massive scalable frameworks handling millions of concurrent requests gracefully.
         </Text>

         <Text position={[0, 5, -360]} fontSize={10} color={isDark ? "#ffffff" : "#020617"} anchorX="center" textAlign="center" letterSpacing={0.2}>
            PROJECT CORE
         </Text>

         <Text position={[0, 0, -500]} fontSize={12} color={isDark ? "#3b82f6" : "#1d4ed8"} anchorX="center" letterSpacing={0.2}>
            INITIALIZE.
         </Text>
      </group>

      {/* Igloo-like Glass Cubicles/Monoliths passing through camera bounds */}
      {cubes.map((props, i) => (
        <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh position={props.position} scale={[props.scale, props.scale, props.scale]}>
                <boxGeometry args={[1, 1, 1]} />
                <meshPhysicalMaterial 
                  color={isDark ? "#050810" : "#ffffff"} 
                  transmission={0.9} 
                  opacity={1} 
                  metalness={isDark ? 0.9 : 0.1} 
                  roughness={0.1} 
                  ior={1.5} 
                  thickness={1} 
                  transparent
                />
            </mesh>
            {/* Glowing Wireframe Rim */}
            <mesh position={props.position} scale={[props.scale * 1.01, props.scale * 1.01, props.scale * 1.01]}>
               <boxGeometry args={[1, 1, 1]} />
               <meshBasicMaterial color={isDark ? "#3b82f6" : "#2563eb"} wireframe transparent opacity={isDark ? 0.3 : 0.15} />
            </mesh>
        </Float>
      ))}
    </>
  );
};
