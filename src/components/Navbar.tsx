import React from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  toggleTheme: () => void;
  theme: string;
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, theme }) => {
  return (
    <div className="navbar bg-base-100 px-6 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          🌸 Mundo Ginlin
        </Link>
      </div>

      <div className="flex-none gap-2">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/Catalog">Catálogo</Link></li>
          <li><Link to="/tienda-fisica">Tienda Física</Link></li>
          <li><Link to="/cart">Carrito</Link></li>
          <li><Link to="/wishlist">Wishlist</Link></li>
          <li><Link to="/orders">Órdenes</Link></li>
          <li><Link to="/login">Ingresar</Link></li>
          <li><Link to="/register">Registrarse</Link></li>
        </ul>

        <button className="btn btn-sm btn-outline ml-2" onClick={toggleTheme}>
          Tema: {theme === 'claro' ? '🌿 Forest' : '☀️ Claro'}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
