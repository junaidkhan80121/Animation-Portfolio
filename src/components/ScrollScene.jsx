import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Scroll, Float } from '@react-three/drei';
import * as THREE from 'three';

export const ScrollScene = () => {
  const scroll = useScroll();
  const carRef = useRef();
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);

  // Create geometric "monoliths" representing the Igloo experience assets
  const monoliths = useMemo(() => {
    const items = [];
    for (let i = 0; i < 60; i++) {
        // Disperse them down the Z-axis track
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 30;
        const z = -i * 6 - 10;
        items.push({ position: [x, y, z], scale: 1 + Math.random() * 4 });
    }
    return items;
  }, []);

  useFrame((state) => {
    const offset = scroll.offset; // 0 to 1
    
    // Path configuration
    const targetZ = -offset * 350;
    const targetX = Math.sin(offset * Math.PI * 4) * 10; 
    const targetY = Math.cos(offset * Math.PI * 2) * 5;

    // Move the vehicle entity
    if (carRef.current) {
        carRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1);
        
        // Banking and pitching effect for dynamic feeling
        const targetRotationZ = -Math.sin(offset * Math.PI * 4) * 0.4;
        carRef.current.rotation.z = THREE.MathUtils.lerp(carRef.current.rotation.z, targetRotationZ, 0.1);
        carRef.current.rotation.x = THREE.MathUtils.lerp(carRef.current.rotation.x, 0.05, 0.1);
    }

    // Camera seamlessly tracks the vehicle, slightly offset to see it
    const camTargetPosition = new THREE.Vector3(
        carRef.current.position.x * 0.5, 
        carRef.current.position.y + 3, 
        carRef.current.position.z + 10
    );
    state.camera.position.lerp(camTargetPosition, 0.05);

    // Look slightly ahead of the car for cinematic feel
    cameraTarget.set(carRef.current.position.x, carRef.current.position.y, carRef.current.position.z - 20);
    state.camera.lookAt(cameraTarget);
  });

  return (
    <>
      <group ref={carRef}>
        {/* Simple futuristic hovercar model made of primitives */}
        <mesh castShadow>
          <boxGeometry args={[1.5, 0.3, 3]} />
          <meshStandardMaterial color="#2563eb" roughness={0.2} metalness={0.8} />
        </mesh>
        {/* Engine Glow */}
        <mesh position={[0, -0.1, 1.6]}>
          <boxGeometry args={[1.2, 0.1, 0.1]} />
          <meshBasicMaterial color="#60a5fa" />
        </mesh>
        {/* Cockpit */}
        <mesh position={[0, 0.3, -0.2]}>
          <boxGeometry args={[0.8, 0.3, 1.5]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.1} metalness={0.9} transparent opacity={0.8} />
        </mesh>
        {/* Headlight beams */}
        <mesh position={[0, 0, -5]}>
           <cylinderGeometry args={[2, 0.1, 10, 32]} />
           <meshBasicMaterial color="#ffffff" transparent opacity={0.05} blending={THREE.AdditiveBlending} />
           <group rotation={[Math.PI / 2, 0, 0]} />
        </mesh>
      </group>

      {/* Render the floating monoliths */}
      {monoliths.map((props, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={props.position} scale={[props.scale, props.scale, props.scale]}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial 
                  color={i % 3 === 0 ? "#111827" : (i % 2 === 0 ? "#1e40af" : "#3b82f6")} 
                  wireframe={i % 5 === 0} 
                  roughness={0.1} 
                  metalness={0.8}
                />
            </mesh>
        </Float>
      ))}

      {/* HTML Overlay Syncing with Scroll */}
      <Scroll html style={{ width: '100vw' }}>
         <div className="html-content-layer">
            <h1 className="manifesto-title" style={{ top: '10vh' }}>O N C H A I N</h1>
            <h2 className="manifesto-text" style={{ top: '120vh' }}>Navigate the data streams.</h2>
            <h2 className="manifesto-text" style={{ top: '220vh' }}>Explore the monoliths.</h2>
            <h2 className="manifesto-text" style={{ top: '320vh' }}>Welcome to the Simulation.</h2>
         </div>
      </Scroll>
    </>
  );
};
