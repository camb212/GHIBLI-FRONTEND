interface HomeProps {
  theme: string; // "cupcake" o "forest"
}

const Home = ({ theme }: HomeProps) => {
  const darkMode = theme === 'forest';

  const featuredProducts = [
  {
    id: 1,
    name: 'Totoro Clásico',
    image: '/imagenes/if1.jpg',
    price: '$15.99',
    rating: 5,
    badge: 'Favorito',
  },
  {
    id: 2,
    name: 'No-Face Sonriente',
    image: '/imagenes/noface.webp',
    price: '$18.50',
    rating: 4,
    badge: 'Bestseller',
  },
  {
    id: 3,
    name: 'Gatobús Mini',
    image: '/imagenes/gatobus.jpg',
    price: '$13.00',
    rating: 4,
    badge: 'Nuevo',
  },
  {
    id: 4,
    name: 'Calcifer Suave',
    image: '/imagenes/calsifer.jpg',
    price: '$14.25',
    rating: 5,
    badge: 'Popular',
  },
  {
    id: 5,
    name: 'Chihiro Pato',
    image: '/imagenes/pato.jpg',
    price: '$17.75',
    rating: 3,
    badge: 'Curioso',
  },
  {
    id: 6,
    name: 'Totoro',
    image: '/imagenes/totoro.webp',
    price: '$35.99',
    rating: 5,
    badge: 'Grande',
  },
  {
    id: 7,
    name: 'Totoro con Paraguas',
    image: '/imagenes/totorop.webp',
    price: '$16.80',
    rating: 4,
    badge: 'Clásico',
  },
  {
    id: 8,
    name: 'Haku Dragón',
    image: '/imagenes/haku.jpg',
    price: '$19.99',
    rating: 5,
    badge: 'Épico',
  },
  {
    id: 9,
    name: 'Glus',
    image: '/imagenes/glus.jpg',
    price: '$22.99',
    rating: 4,
    badge: 'Raro',
  },
  {
    id: 10,
    name: 'Jiji el Gato',
    image: '/imagenes/gato.avif',
    price: '$20.99',
    rating: 5,
    badge: 'Mágico',
  }
];

  const categories = [
    { name: "Totoro", count: "3 productos", icon: "🌿", color: "bg-green-100 text-green-800" },
    { name: "El Viaje de Chihiro", count: "3 productos", icon: "🐉", color: "bg-blue-100 text-blue-800" },
    { name: "El Castillo Ambulante", count: "1 producto", icon: "🔥", color: "bg-orange-100 text-orange-800" },
    { name: "Kiki: Entregas a Domicilio", count: "1 producto", icon: "🐱", color: "bg-purple-100 text-purple-800" }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="hero min-h-screen relative">
        <div className="hero-overlay bg-opacity-40"></div>
        <img
          src="/banner-ghibli.jpg"
          alt="Studio Ghibli Banner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="hero-content text-center text-neutral-content z-10">
          <div className="max-w-md">
            <h1 className="mb-5 text-6xl font-bold drop-shadow-lg">
              Peluches del Estudio Ghibli
            </h1>
            <p className="mb-5 text-xl drop-shadow-md">
              Totoro, No-Face y más personajes adorables ahora en versión peluche.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="btn btn-primary btn-lg" onClick={() => window.location.href = '/catalog'}>
                Ver Catálogo
              </button>
              <button className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-gray-800">
                Ver Trailer
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`stats stats-vertical lg:stats-horizontal shadow w-full ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className="stat">
          <div className="stat-title">Clientes Felices</div>
          <div className="stat-value text-primary">15.2K</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>
        <div className="stat">
          <div className="stat-title">Productos Vendidos</div>
          <div className="stat-value text-secondary">2.6K</div>
          <div className="stat-desc">↗︎ 40 (14%)</div>
        </div>
        <div className="stat">
          <div className="stat-value">86%</div>
          <div className="stat-title">Satisfacción</div>
          <div className="stat-desc text-accent">31 reseñas nuevas</div>
        </div>
      </div>

      {/* Featured Products */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Productos Destacados
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Los peluches más queridos por nuestros clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className={`card shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                <figure className="px-6 pt-6">
                  <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                    <span className="text-6xl">🧸</span>
                  </div>
                </figure>
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h2 className={`card-title ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {product.name}
                    </h2>
                    <div className="badge badge-primary">{product.badge}</div>
                  </div>
                  <div className="rating rating-sm">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        className={`mask mask-star-2 ${i < product.rating ? 'bg-orange-400' : 'bg-gray-300'}`}
                        disabled
                      />
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                      {product.price}
                    </span>
                    <button className="btn btn-primary btn-sm">Agregar al Carrito</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Explora por Película
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Encuentra a tus personajes favoritos organizados por película
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`card ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'} shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                onClick={() => {
                  window.location.href = `/catalog?categoria=${encodeURIComponent(category.name)}`;
                }}
              >
                <div className="card-body text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className={`card-title text-lg justify-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {category.count}
                  </p>
                  <div className="mt-4">
                    <div className={`badge ${category.color} badge-lg`}>Ver Colección</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`card ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className="card-body">
              <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                🌟 Únete a la Magia Ghibli
              </h2>
              <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Recibe las últimas novedades, ofertas exclusivas y lanzamientos de nuevos peluches
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="mundoghibli@gmail.com"
                  className={`input input-bordered flex-1 ${darkMode ? 'bg-gray-700 text-white' : ''}`}
                />
                <button className="btn btn-primary">Suscribirse</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
