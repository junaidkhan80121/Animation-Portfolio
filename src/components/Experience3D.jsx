import React, { Component, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Stars, Html } from '@react-three/drei';
import { ScrollScene } from './ScrollScene';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'red' }}>
          <h3>Asset Error: The 3D model could not be loaded from the CDN right now. Please try again later.</h3>
        </div>
      );
    }
    return this.props.children;
  }
}

const Loader = () => (
  <Html center>
    <div style={{ color: 'inherit', fontFamily: 'Outfit', letterSpacing: '0.2rem', whiteSpace: 'nowrap' }}>
      LOADING ASSETS...
    </div>
  </Html>
);

export const Experience3D = ({ theme }) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#050810' : '#f8fafc';
  const fogColor = isDark ? '#050810' : '#e2e8f0';
  const dirLightColors = isDark ? ['#3b82f6', '#e879f9', '#60a5fa'] : ['#fb923c', '#2dd4bf', '#818cf8'];

  return (
    <ErrorBoundary>
      <Canvas
        camera={{ position: [0, 2, 10], fov: 45 }}
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: bgColor, transition: 'background-color 0.5s ease' }}
      >
        <color attach="background" args={[bgColor]} />
        <fog attach="fog" args={[fogColor, 5, 50]} />
        
        <ambientLight intensity={isDark ? 0.3 : 1.5} color={isDark ? "#1e3a8a" : "#ffffff"} />
        <directionalLight position={[10, 20, 5]} intensity={isDark ? 1.5 : 2} color={dirLightColors[0]} />
        <pointLight position={[-10, -5, -15]} intensity={isDark ? 1.5 : 0.8} color={dirLightColors[1]} />
        <pointLight position={[10, 5, -25]} intensity={isDark ? 1 : 0.5} color={dirLightColors[2]} />

        <Stars 
          radius={100} depth={50} count={isDark ? 5000 : 1500} 
          factor={isDark ? 4 : 2} saturation={0} fade speed={1} 
          color={isDark ? "#ffffff" : "#475569"} 
        />
        
        <Suspense fallback={<Loader />}>
          <ScrollControls pages={5} damping={0.2}>
            <ScrollScene theme={theme} />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  );
};
