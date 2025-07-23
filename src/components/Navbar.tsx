// Navbar component code here
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost normal-case text-xl">Ghibli Plushies</Link>
      </div>
      <div className="flex-none">
        <Link to="/catalog" className="btn btn-ghost">Catálogo</Link>
        <Link to="/cart" className="btn btn-ghost">Carrito</Link>
        <Link to="/wishlist" className="btn btn-ghost">Wishlist</Link>
        <Link to="/orders" className="btn btn-ghost">Pedidos</Link>
        {token ? (
          <button onClick={handleLogout} className="btn btn-outline ml-2">Cerrar sesión</button>
        ) : (
          <>
            <Link to="/login" className="btn btn-outline ml-2">Login</Link>
            <Link to="/register" className="btn btn-outline ml-2">Registro</Link>
          </>
        )}
      </div>
    </div>
  );
}
