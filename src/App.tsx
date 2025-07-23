import React, { useState, useEffect } from 'react';
import AppRoutes from './routes';
import Navbar from './components/Navbar';
import './App.css'


const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'claro');

  const toggleTheme = () => {
    const nuevoTema = theme === 'claro' ? 'forest' : 'claro';
    setTheme(nuevoTema);
    localStorage.setItem('theme', nuevoTema);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <AppRoutes toggleTheme={toggleTheme} theme={theme} />
    </div>
  );
};

export default App;
