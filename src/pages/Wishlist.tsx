// Wishlist page
import { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<any>({});
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;
    api.get('/wishlist/1')
      .then(res => setWishlist(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Tu Wishlist</h2>
      <p className="mt-2">Productos: {wishlist?.plushieIds?.length ?? 0}</p>
    </div>
  );
}
