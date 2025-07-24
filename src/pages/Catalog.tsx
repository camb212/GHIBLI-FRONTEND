import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Plushie {
  _id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
}

const Catalog: React.FC = () => {
  const [plushies, setPlushies] = useState<Plushie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlushies = async () => {
      try {
        const response = await axios.get('https://ghibli-peluches-backend.onrender.com/plushies');
        setPlushies(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los productos');
        setLoading(false);
      }
    };

    fetchPlushies();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Cargando productos...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {plushies.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Agregar al carrito</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalog;
