import React, { useState } from 'react';
import { Experience3D } from './components/Experience3D';
import { Moon, Sun } from 'lucide-react';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`app-wrapper ${theme}`}>
      <Experience3D theme={theme} />
      
      {/* Igloo-style HUD UI Interfacing */}
      <div className="hud-layer">
         <div className="hud-top-bar">
            <div className="logo">Sub-Zero</div>
            
            <div className="hud-controls">
               <div className="status blink">SCROLL TO DELVE</div>
               <button className="theme-toggle" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
               </button>
            </div>
         </div>
         
         <div className="hud-bottom-bar">
            <div>CAM_TARGET: [0.5, 4.0, Z]</div>
            <div>VER: 3.1.0-STABLE</div>
            <div>ENVIRONMENT: {theme.toUpperCase()}</div>
         </div>
         
         <div className="crosshair"></div>
      </div>
    </div>
  );
}

export default App;
