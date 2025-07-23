import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-sky-100 to-indigo-100">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">🎥 Studio Ghibli</h1>
      <p className="text-lg text-gray-700 text-center max-w-md">
        Bienvenido a la app de Studio Ghibli. Explora películas, personajes y más.
      </p>
    </div>
  );
}
import ReactDOM from 'react-dom/client';