import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll, Float, useGLTF, Text } from '@react-three/drei';
import * as THREE from 'three';

// Sub-component to load the local 3D Duck model gracefully
export function WorldModel() {
  // Using the classic Khronos glTF Sample Duck to ensure safe loading
  const { scene } = useGLTF('./duck.glb'); // Load locally from public folder
  
  // Adjusted scale and position for the Duck so it flies down the path perfectly
  return (
     <primitive object={scene} scale={2.5} position={[0, -1, 0]} rotation={[0, Math.PI / 2, 0]} />
  );
}

// Preload the local model
useGLTF.preload('./duck.glb');

export const ScrollScene = ({ theme }) => {
  const isDark = theme === 'dark';
  const scroll = useScroll();
  const playerRef = useRef();
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);

  const textGroupRef = useRef();

  const monoliths = useMemo(() => {
    const items = [];
    for (let i = 0; i < 60; i++) {
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 30;
        const z = -i * 6 - 15; 
        items.push({ position: [x, y, z], scale: 1 + Math.random() * 4 });
    }
    return items;
  }, []);

  useFrame((state) => {
    const offset = scroll.offset; 
    
    // Path configuration matches Z distribution
    const targetZ = -offset * 350;
    const targetX = Math.sin(offset * Math.PI * 4) * 10; 
    const targetY = Math.cos(offset * Math.PI * 2) * 5;

    if (playerRef.current) {
        playerRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1);
        
        // Banking effect
        const targetRotationZ = -Math.sin(offset * Math.PI * 4) * 0.15; 
        const targetRotationY = -Math.sin(offset * Math.PI * 4 + 0.5) * 0.2; 
        
        playerRef.current.rotation.z = THREE.MathUtils.lerp(playerRef.current.rotation.z, targetRotationZ, 0.1);
        playerRef.current.rotation.y = THREE.MathUtils.lerp(playerRef.current.rotation.y, targetRotationY, 0.1);
        playerRef.current.rotation.x = THREE.MathUtils.lerp(playerRef.current.rotation.x, targetY * -0.02, 0.1);
    }

    const camTargetPosition = new THREE.Vector3(
        playerRef.current.position.x * 0.5, 
        playerRef.current.position.y + 3, 
        playerRef.current.position.z + 12
    );
    state.camera.position.lerp(camTargetPosition, 0.05);

    cameraTarget.set(playerRef.current.position.x * 0.8, playerRef.current.position.y, playerRef.current.position.z - 20);
    state.camera.lookAt(cameraTarget);
  });

  return (
    <>
      <group ref={playerRef}>
         <WorldModel />
      </group>

      {/* Floating Cinematic 3D Typography mapped dynamically along the Z-axis track */}
      {/* Fallback fonts are natively supplied by react-three/drei, ensuring network zero-failures */}
      <group ref={textGroupRef}>
         <Text 
            position={[0, 5, -20]} 
            fontSize={8} 
            color={isDark ? "#ffffff" : "#1e40af"} 
            anchorX="center" anchorY="middle"
         >
            ONCHAIN
         </Text>
         
         <Text 
            position={[-8, 6, -100]} 
            fontSize={5} 
            color={isDark ? "#93c5fd" : "#3b82f6"} 
         >
            Navigate explicitly via
         </Text>
         <Text 
            position={[5, 2, -105]} 
            fontSize={6} 
            color={isDark ? "#e879f9" : "#a855f7"} 
         >
            Simulation.
         </Text>

         <Text 
            position={[0, 0, -220]} 
            fontSize={12} 
            color={isDark ? "#2563eb" : "#1d4ed8"} 
         >
            ACCELERATE
         </Text>
         
         <Text 
            position={[0, 4, -330]} 
            fontSize={6} 
            color={isDark ? "#ffffff" : "#111827"} 
         >
            The Journey Ends Here.
         </Text>
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
                  opacity={isDark ? 0.9 : 0.8}
                />
            </mesh>
        </Float>
      ))}
    </>
  );
};
