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
      
      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle" 
        onClick={toggleTheme}
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Permanent Fixed Overlay HUD Elements */}
      <div className="fixed-hud bottom-left">
        STATUS: ONLINE | SCROLL TO EXPLORE
      </div>
      <div className="fixed-hud top-right">
        IGLOO REPLICA v3.0 | {theme.toUpperCase()} MODE
      </div>
    </div>
  );
}

export default App;
