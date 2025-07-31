import React from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  toggleTheme: () => void;
  theme: string;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, theme }) => {
  // Obtener usuario desde localStorage
  let user = null;
  try {
    const userStr = localStorage.getItem('user');
    if (userStr) user = JSON.parse(userStr);
  } catch {}
  const isLoggedIn = !!localStorage.getItem('access_token') && user;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="navbar bg-base-100 px-6 shadow-md flex items-center justify-between">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          🌸 Mundo Ghibli
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/Catalog">Catálogo</Link></li>
          <li><Link to="/tienda-fisica">Tienda Física</Link></li>
          <li><Link to="/cart">Carrito</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>
          {!isLoggedIn && <li><Link to="/login">Ingresar</Link></li>}
          {!isLoggedIn && <li><Link to="/register">Registrarse</Link></li>}
        </ul>
        {isLoggedIn && (
          <div className="relative">
            <button
              className="flex items-center gap-2 bg-green-100 hover:bg-green-200 px-3 py-1 rounded-lg transition-colors font-semibold text-green-800 focus:outline-none"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <User className="w-5 h-5 text-green-700" />
              <span>{user.username || user.nombre}</span>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 gap-2 rounded-t-lg"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
        <button className="btn btn-sm btn-outline ml-2" onClick={toggleTheme}>
          Tema: {theme === 'dark' ? 'light' : '☀️ Claro'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
