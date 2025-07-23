// Catalog page
import { useEffect, useState, useContext } from 'react';
import ProductCard from '../components/ProductCard';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function Catalog() {
  const [products, setProducts] = useState([] as any[]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    api.get('/plushies')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleAddToCart = async (id: string) => {
    if (!token) {
      alert('Debes iniciar sesión para agregar al carrito');
      return;
    }
    await api.post(`/cart/1`, { plushieId: id }); // ⚡ Usa el ID real del usuario
    alert('Agregado al carrito');
  };

  const handleAddToWishlist = async (id: string) => {
    if (!token) {
      alert('Debes iniciar sesión para agregar a wishlist');
      return;
    }
    await api.post(`/wishlist/1`, { plushieId: id });
    alert('Agregado a wishlist');
  };

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(p => (
        <ProductCard
          key={p._id}
          name={p.name}
          price={p.price}
          description={p.description}
          image={p.image}
          onAddToCart={() => handleAddToCart(p._id)}
          onAddToWishlist={() => handleAddToWishlist(p._id)}
        />
      ))}
    </div>
  );
}
