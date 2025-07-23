import React from 'react';
import { Routes, Route } from 'react-router-dom';

interface AppRoutesProps {
  toggleTheme: () => void;
  theme: string;
}

const Home = ({ theme }: { theme: string }) => (
  <div>
    <h1>Home Page</h1>
    <p>Tema actual: {theme}</p>
  </div>
);

const AppRoutes = ({ toggleTheme, theme }: AppRoutesProps) => {
  return (
    <>
      <button onClick={toggleTheme}>Cambiar tema</button>
      <Routes>
        <Route path="/" element={<Home theme={theme} />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
