import { Routes, Route } from 'react-router-dom';

interface AppRoutesProps {
  toggleTheme: () => void;
  theme: string;
}

const Home = ({ theme, toggleTheme }: { theme: string, toggleTheme: () => void }) => (
  <div>
    <h1>Home Page</h1>
    <p>Tema actual: {theme}</p>
    <button onClick={toggleTheme}>Cambiar tema</button>
  </div>
);

// Importa los otros componentes!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! 
import Catalog from '../pages/Catalog';
import Wishlist from '../pages/Wishlist';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Register from '../pages/Register';
import TiendaFisica from '../pages/TiendaFisica';

const AppRoutes = ({ toggleTheme, theme }: AppRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/catalog" element={<Catalog />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> 
      <Route path="/tienda-fisica" element={<TiendaFisica />} />
    </Routes>
  );
};

export default AppRoutes;
