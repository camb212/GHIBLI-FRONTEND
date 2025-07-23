// Orders page
import { useEffect, useState, useContext } from 'react';
import api from '../api/api';
import { AuthContext } from '../contexts/AuthContext';

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (!token) return;
    api.get('/orders') // ⚡ Aquí puedes filtrar por usuario
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, [token]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Tus pedidos</h2>
      {orders.length === 0 ? (
        <p className="mt-2">No tienes pedidos.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              Pedido #{order.id} — Total: ${order.total} — Estado: {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
