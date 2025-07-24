import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';  

import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import TiendaFisica from './pages/TiendaFisica';
import Catalog from './pages/Catalog';
interface AppRoutesProps {
  theme: string;
}

export default function AppRoutes({ theme }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<Home theme={theme} />} />
      <Route path="/Catalog" element={<Catalog />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tienda-fisica" element={<TiendaFisica />} />
    </Routes>
  );
}
