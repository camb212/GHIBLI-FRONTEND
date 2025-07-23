import { useEffect, useState } from 'react';

type PlushieType = {
  id: number;
  name: string;
  price: number;
  image: string;
  character: string;
  movie: string;
  inStock: boolean;
  rating: number;
};

type WishlistType = {
  plushieIds?: number[];
};

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistType>({});
  const [plushies, setPlushies] = useState<PlushieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');

  // Datos mock con imágenes placeholder
  const mockPlushies: PlushieType[] = [
   { id: 1, name: 'Totoro Clásico', image: '/imagenes/if1.jpg', price: 15.99, character: 'Totoro', movie: 'Mi Vecino Totoro', inStock: true, rating: 4.8 },
   { id: 2, name: 'No-Face Sonriente', image: '/imagenes/noface.webp', price: 18.50, character: 'Sin Cara', movie: 'El Viaje de Chihiro', inStock: true, rating: 4.7 },
   { id: 3, name: 'Gatobús Mini', image: '/imagenes/gatobus.jpg', price: 13.00, character: 'Catbus', movie: 'Mi Vecino Totoro', inStock: true, rating: 4.6 },
   { id: 4, name: 'Calcifer Suave', image: '/imagenes/calsifer.jpg', price: 14.25, character: 'Calcifer', movie: 'El Castillo Ambulante', inStock: true, rating: 4.9 },
   { id: 5, name: 'Chihiro Pato', image: '/imagenes/pato.jpg', price: 17.75, character: 'Chihiro', movie: 'El Viaje de Chihiro', inStock: false, rating: 4.4 },
   { id: 6, name: 'Totoro', image: '/imagenes/totoro.webp', price: 35.99, character: 'Totoro', movie: 'Mi Vecino Totoro', inStock: true, rating: 4.9 },
   { id: 7, name: 'Totoro con Paraguas', image: '/imagenes/totorop.webp', price: 16.80, character: 'Totoro', movie: 'Mi Vecino Totoro', inStock: true, rating: 4.6 },
   { id: 8, name: 'Haku Dragón', image: '/imagenes/haku.jpg', price: 19.99, character: 'Haku', movie: 'El Viaje de Chihiro', inStock: true, rating: 4.8 },
   { id: 9, name: 'Glus', image: '/imagenes/glus.jpg', price: 22.99, character: 'Glus', movie: 'Original', inStock: false, rating: 4.3 },
   { id: 10, name: 'Jiji el Gato', image: '/imagenes/gato.avif', price: 20.99, character: 'Jiji', movie: 'Kiki: Entregas a Domicilio', inStock: true, rating: 4.7 },
   { id: 11, name: 'Gatobús Grande', image: '/imagenes/p6.jpg', price: 30.00, character: 'Catbus', movie: 'Mi Vecino Totoro', inStock: true, rating: 4.9 },
];
  useEffect(() => {
    setTimeout(() => {
      setWishlist({ plushieIds: mockPlushies.map(p => p.id) });
      setPlushies(mockPlushies);
      setLoading(false);
    }, 800);
  }, []);

  const removeFromWishlist = (plushieId: number) => {
    setWishlist(prev => ({
      ...prev,
      plushieIds: prev.plushieIds?.filter(id => id !== plushieId) || []
    }));
  };

  const addToCart = (plushie: PlushieType) => {
    alert(`${plushie.name} agregado al carrito! 🛒`);
  };

  const filteredPlushies = plushies
    .filter(p => wishlist.plushieIds?.includes(p.id))
    .filter(p => {
      if (filter === 'inStock') return p.inStock;
      if (filter === 'outOfStock') return !p.inStock;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  const totalValue = filteredPlushies.reduce((sum, p) => sum + p.price, 0);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-pink-200 border-t-pink-600 mx-auto mb-6"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">🧸</span>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Cargando tu wishlist...</h2>
          <p className="text-gray-500">Preparando tus peluches favoritos</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-2xl">💝</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  Mi Wishlist
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="badge bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                    {filteredPlushies.length} productos
                  </div>
                  <div className="badge bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Total: ${totalValue.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Controls */}
            <div className="flex flex-wrap gap-3">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium text-gray-600">Filtrar</span>
                </label>
                <select 
                  value={filter} 
                  onChange={e => setFilter(e.target.value as any)} 
                  className="select select-bordered bg-white border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 rounded-xl px-4 py-2 min-w-[120px] transition-all duration-200"
                >
                  <option value="all">🎯 Todos</option>
                  <option value="inStock">✅ En Stock</option>
                  <option value="outOfStock">❌ Agotados</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm font-medium text-gray-600">Ordenar</span>
                </label>
                <select 
                  value={sortBy} 
                  onChange={e => setSortBy(e.target.value as any)} 
                  className="select select-bordered bg-white border-2 border-gray-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 rounded-xl px-4 py-2 min-w-[120px] transition-all duration-200"
                >
                  <option value="name">📝 Nombre</option>
                  <option value="price">💰 Precio</option>
                  <option value="rating">⭐ Valoración</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredPlushies.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm text-center p-16 rounded-2xl shadow-xl border border-white/20">
            <div className="text-8xl mb-6">🔍</div>
            <h2 className="text-3xl font-bold text-gray-700 mb-4">No hay productos que coincidan</h2>
            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
              Prueba cambiar los filtros o agrega más productos a tu wishlist para ver tus peluches favoritos.
            </p>
            <button 
              onClick={() => setFilter('all')}
              className="btn bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Ver todos los productos
            </button>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPlushies.map(p => (
              <div key={p.id} className="card bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 group">
                <figure className="relative overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" 
                  />
                  
                  {/* Stock Overlay */}
                  {!p.inStock && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <div className="bg-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                        😔 Agotado
                      </div>
                    </div>
                  )}
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(p.id)}
                    className="absolute top-3 right-3 btn btn-circle btn-sm bg-white/90 hover:bg-red-500 hover:text-white border-none shadow-lg transition-all duration-200 transform hover:scale-110"
                  >
                    ❌
                  </button>
                  
                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <span className="text-yellow-500">⭐</span>
                    <span className="text-sm font-bold text-gray-700">{p.rating}</span>
                  </div>
                </figure>
                
                <div className="card-body p-6">
                  <h3 className="card-title text-xl font-bold text-gray-800 line-clamp-1">
                    {p.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <div className="badge badge-outline border-pink-300 text-pink-600 px-2 py-1 text-xs">
                      {p.character}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-1">
                    🎬 {p.movie}
                  </p>
                  
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(p.rating)}
                    <span className="text-xs text-gray-500 ml-1">({p.rating})</span>
                  </div>
                  
                  <div className="card-actions justify-between items-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      ${p.price}
                    </div>
                    
                    <button
                      onClick={() => addToCart(p)}
                      disabled={!p.inStock}
                      className={`btn btn-sm px-6 py-2 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 ${
                        p.inStock
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-none shadow-lg hover:shadow-xl'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed border-none'
                      }`}
                    >
                      {p.inStock ? '🛒 Agregar' : '😢 Agotado'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}