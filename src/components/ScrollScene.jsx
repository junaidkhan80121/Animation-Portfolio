import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Scroll, Float } from '@react-three/drei';
import * as THREE from 'three';

export const ScrollScene = ({ theme }) => {
  const isDark = theme === 'dark';
  const scroll = useScroll();
  const playerRef = useRef();
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);

  // Create geometric "monoliths"
  const monoliths = useMemo(() => {
    const items = [];
    for (let i = 0; i < 60; i++) {
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
    if (playerRef.current) {
        playerRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1);
        
        // Aviation Banking and pitching effect since it's a sleek aircraft now
        const targetRotationZ = -Math.sin(offset * Math.PI * 4) * 0.8; 
        playerRef.current.rotation.z = THREE.MathUtils.lerp(playerRef.current.rotation.z, targetRotationZ, 0.1);
        playerRef.current.rotation.x = THREE.MathUtils.lerp(playerRef.current.rotation.x, targetY * -0.05, 0.1);
    }

    // Camera seamlessly tracks the vehicle
    const camTargetPosition = new THREE.Vector3(
        playerRef.current.position.x * 0.5, 
        playerRef.current.position.y + 3, 
        playerRef.current.position.z + 12
    );
    state.camera.position.lerp(camTargetPosition, 0.05);

    cameraTarget.set(playerRef.current.position.x, playerRef.current.position.y, playerRef.current.position.z - 20);
    state.camera.lookAt(cameraTarget);
  });

  return (
    <>
      <group ref={playerRef}>
        {/* Sleek Minimalist Aircraft / Crystal Glider */}
        <mesh castShadow rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[1.5, 4, 4]} />
          <meshStandardMaterial 
             color={isDark ? "#ffffff" : "#2563eb"} 
             roughness={0.2} 
             metalness={0.8} 
          />
        </mesh>
        {/* Glowing Engine Core */}
        <mesh position={[0, 0.5, 2]} scale={0.6}>
          <octahedronGeometry />
          <meshBasicMaterial color={isDark ? "#3b82f6" : "#fb923c"} />
        </mesh>
      </group>

      {/* Render the floating monoliths */}
      {monoliths.map((props, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh position={props.position} scale={[props.scale, props.scale, props.scale]}>
                <octahedronGeometry args={[1, 0]} />
                <meshStandardMaterial 
                  color={
                    isDark 
                    ? (i % 3 === 0 ? "#111827" : (i % 2 === 0 ? "#1e40af" : "#3b82f6"))
                    : (i % 3 === 0 ? "#94a3b8" : (i % 2 === 0 ? "#cbd5e1" : "#e2e8f0"))
                  } 
                  wireframe={i % 5 === 0} 
                  roughness={isDark ? 0.1 : 0.4} 
                  metalness={isDark ? 0.8 : 0.2}
                  transparent
                  opacity={isDark ? 1 : 0.9}
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
