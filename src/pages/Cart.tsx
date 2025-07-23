// Cart page
import { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function Cart() {
  const [cart, setCart] = useState<any>({});
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;
    api.get('/cart/1')
      .then(res => setCart(res.data))
      .catch(err => console.error(err));
  }, [token]);

  const handleClear = async () => {
    await api.delete('/cart/1');
    alert('Carrito limpiado');
    setCart({ plushieIds: [] });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Tu carrito</h2>
      <p className="mt-2">Productos: {cart?.plushieIds?.length ?? 0}</p>
      <button className="btn btn-error mt-4" onClick={handleClear}>Vaciar carrito</button>
    </div>
  );
}
