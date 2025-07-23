import React from 'react';

const products = [
  {
    id: 1,
    name: 'Totoro Gigante',
    price: 29.99,
    image: '/images/totoro.jpg',
  },
  {
    id: 2,
    name: 'Calcifer Almohada',
    price: 24.99,
    image: '/images/calcifer.jpg',
  },
  {
    id: 3,
    name: 'Jiji Peluche',
    price: 19.99,
    image: '/images/jiji.jpg',
  },
  {
    id: 4,
    name: 'Bola de Hollín',
    price: 9.99,
    image: '/images/hollin.jpg',
  },
];

const Catalog: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Catálogo de Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img src={product.image} alt={product.name} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.name}</h2>
              <p>${product.price.toFixed(2)}</p>
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