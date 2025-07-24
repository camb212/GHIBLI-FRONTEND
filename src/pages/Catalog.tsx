import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Totoro Gigante',
    price: 29.99,
    image: '/imagenes/totoro.webp',
    category: 'Peluches',
    description: 'El adorable espíritu del bosque en versión gigante',
    rating: 5,
  },
  {
    id: 2,
    name: 'Calcifer Mágico',
    price: 24.99,
    image: '/imagenes/calsifer.jpg',
    category: 'Decoración',
    description: 'El demonio del fuego que iluminará tu hogar',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'Gato del Baron',
    price: 19.99,
    image: '/imagenes/gato.avif',
    category: 'Figuras',
    description: 'Elegante figura del misterioso Barón',
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Sin Cara Místico',
    price: 34.99,
    image: '/imagenes/noface.webp',
    category: 'Coleccionables',
    description: 'El enigmático personaje de El Viaje de Chihiro',
    rating: 4.7,
  },
  {
    id: 5,
    name: 'Haku Dragón',
    price: 39.99,
    image: '/imagenes/haku.jpg',
    category: 'Figuras',
    description: 'La majestuosa transformación de Haku',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Gatobus Aventurero',
    price: 45.99,
    image: '/imagenes/gatobus.jpg',
    category: 'Vehículos',
    description: 'El fantástico medio de transporte felino',
    rating: 5,
  },
  {
    id: 7,
    name: 'Totoro Pequeño',
    price: 15.99,
    image: '/imagenes/totorop.webp',
    category: 'Peluches',
    description: 'La versión miniatura del querido Totoro',
    rating: 4.6,
  },
  {
    id: 8,
    name: 'Pato Mágico',
    price: 22.99,
    image: '/imagenes/pato.jpg',
    category: 'Juguetes',
    description: 'Compañero acuático lleno de magia',
    rating: 4.5,
  },
];

const categories = ['Todos', 'Peluches', 'Figuras', 'Decoración', 'Coleccionables', 'Vehículos', 'Juguetes'];

const Catalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [isAnimating, setIsAnimating] = useState<number | null>(null);

  const filteredProducts = selectedCategory === 'Todos' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
    setIsAnimating(productId);
    setTimeout(() => setIsAnimating(null), 600);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#d0f2e6'}}>
      {/* Header Section */}
      <div className="bg-gradient-to-br from-crusoe-900 via-crusoe-800 to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-crusoe-400 to-crusoe-500 rounded-full mb-6 shadow-2xl">
            <span className="text-4xl">🛍️</span>
          </div>
          <h1 className="text-6xl font-bold text-white mb-6 drop-shadow-lg">
            Catálogo <span className="text-crusoe-300">Ghibli</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto font-medium">
            Descubre nuestra colección exclusiva de productos oficiales Studio Ghibli
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category Filter */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-crusoe-900 mb-6 text-center">
            Explorar por Categorías
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-crusoe-600 to-crusoe-700 text-white shadow-lg scale-105'
                    : 'bg-white text-crusoe-700 border-2 border-crusoe-300 hover:bg-crusoe-50 hover:border-crusoe-500'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 max-w-md mx-auto w-full"
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-crusoe-50 to-crusoe-100 h-64 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  style={{ 
                    objectFit: 'contain',
                    maxHeight: '100%',
                    maxWidth: '100%'
                  }}
                />
                
                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="bg-crusoe-500 text-white px-2 py-1 rounded-md text-xs font-medium shadow-md">
                    {product.category}
                  </span>
                </div>

                {/* Quick View Button */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white hover:bg-gray-50 text-crusoe-700 p-2 rounded-lg shadow-md transition-all duration-200 hover:scale-105">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-5">
                <div className="mb-3">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-crusoe-700 transition-colors duration-300 line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(product.rating)}
                      <span className="text-gray-500 text-sm ml-1">({product.rating})</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-crusoe-600">
                    ${product.price.toFixed(2)}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {cart[product.id] && (
                      <span className="bg-crusoe-100 text-crusoe-700 px-3 py-1 rounded-full text-sm font-medium border border-crusoe-300">
                        {cart[product.id]}
                      </span>
                    )}
                    
                    <button
                      onClick={() => addToCart(product.id)}
                      className={`bg-crusoe-500 hover:bg-crusoe-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-sm flex items-center space-x-2 ${
                        isAnimating === product.id ? 'animate-pulse scale-105' : ''
                      }`}
                    >
                      <svg 
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isAnimating === product.id ? 'animate-bounce' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18" />
                      </svg>
                      <span>Agregar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-crusoe-100 rounded-full mb-6">
              <span className="text-4xl">😢</span>
            </div>
            <h3 className="text-2xl font-bold text-crusoe-800 mb-4">
              No se encontraron productos
            </h3>
            <p className="text-crusoe-600 text-lg">
              Intenta con una categoría diferente
            </p>
          </div>
        )}

        {/* Cart Summary */}
        {Object.keys(cart).length > 0 && (
          <div className="fixed bottom-6 right-6 bg-gradient-to-r from-crusoe-600 to-crusoe-700 text-white p-4 rounded-2xl shadow-2xl z-50">
            <div className="flex items-center space-x-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L17 18" />
              </svg>
              <span className="font-semibold">
                {Object.values(cart).reduce((sum, count) => sum + count, 0)} productos en carrito
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catalog;