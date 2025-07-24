import React, { useState, useEffect } from "react";

const TiendaFisica: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const images = [
    {
      url: "/imagenes/baner.png",
      title: "Bienvenido al Mundo Ghibli",
      description: "Donde la magia cobra vida en cada rincón",
    },
    {
      url: "/imagenes/if1.jpg",
      title: "Entrada Principal",
      description: "Tu portal hacia el universo Studio Ghibli",
    },
    {
      url: "/imagenes/if2.avif",
      title: "Galería de Personajes",
      description: "Encuentra a todos tus personajes favoritos",
    },
    {
      url: "/imagenes/tienda1.jpg",
      title: "Rincón Totoro",
      description: "Productos exclusivos de Mi Vecino Totoro",
    },
    {
      url: "/imagenes/tienda2.jpg",
      title: "Ambiente Mágico",
      description: "Cada detalle cuenta una historia",
    },
    {
      url: "/imagenes/p6.jpg",
      title: "Tesoros Únicos",
      description: "Colecciones limitadas y arte exclusivo",
    },
  ];

  const characters = [
    { img: "/imagenes/totoro.webp", name: "Totoro" },
    { img: "/imagenes/calsifer.jpg", name: "Calcifer" },
    { img: "/imagenes/haku.jpg", name: "Haku" },
    { img: "/imagenes/noface.webp", name: "Sin Cara" },
    { img: "/imagenes/gatobus.jpg", name: "Gatobus" },
    { img: "/imagenes/gato.avif", name: "Barón" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-mint-50 to-green-100" style={{backgroundColor: '#d0f2e6'}}>
      {/* Hero Section with Carousel */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-crusoe-900/20 to-crusoe-700/20 z-10"></div>
        
        {/* Carousel Container */}
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src={images[currentSlide].url}
              alt={images[currentSlide].title}
              className={`w-full h-full object-cover transition-all duration-1000 ${
                isLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
              }`}
            />
          </div>

          {/* Hero Content */}
          <div className="relative z-20 flex items-center justify-center h-full">
            <div className="text-center px-6 max-w-4xl">
              <div className={`transform transition-all duration-1000 delay-300 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <div className="inline-flex items-center justify-center w-20 h-20 bg-crusoe-500 rounded-full mb-6 shadow-2xl animate-pulse">
                  <span className="text-4xl">🏪</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
                  Ghibli
                  <span className="text-crusoe-300"> Store</span>
                </h1>
                <p className="text-xl md:text-2xl text-crusoe-100 mb-8 leading-relaxed">
                  {images[currentSlide].description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-crusoe-500 hover:bg-crusoe-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-crusoe-500/25">
                    Explorar Tienda
                  </button>
                  <button className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105">
                    Ver Ubicación
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-crusoe-500/80 hover:bg-crusoe-500 backdrop-blur-sm text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-crusoe-500/80 hover:bg-crusoe-500 backdrop-blur-sm text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-crusoe-400 scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/75 hover:scale-110"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Characters Showcase */}
      <section className="py-20" style={{backgroundColor: '#c5f2dc'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-crusoe-900 mb-6">
              Personajes Legendarios
            </h2>
            <p className="text-xl text-crusoe-700 max-w-3xl mx-auto">
              Conoce a los personajes más queridos del universo Studio Ghibli
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {characters.map((character, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-crusoe-800 to-crusoe-900 rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              >
                <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-crusoe-100 to-crusoe-200">
                  <img
                    src={character.img}
                    alt={character.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-center font-bold text-white group-hover:text-crusoe-200 transition-colors">
                  {character.name}
                </h3>
                <div className="absolute inset-0 bg-gradient-to-t from-crusoe-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Store Information */}
      <section className="py-20 bg-gradient-to-br from-crusoe-900 via-crusoe-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
              Información de la Tienda
            </h2>
            <p className="text-xl text-emerald-100 max-w-3xl mx-auto font-medium">
              Todo lo que necesitas saber para visitarnos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-crusoe-600/30 rounded-2xl p-8 text-center hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-crusoe-400 to-crusoe-500 rounded-full mb-6 text-3xl shadow-lg">
                📍
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Ubicación</h3>
              <p className="text-gray-200 text-lg leading-relaxed font-medium">
                Centro Comercial Mágico<br />
                <span className="text-crusoe-300">Local 15B, Piso 2</span><br />
                Ciudad Encantada
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-crusoe-600/30 rounded-2xl p-8 text-center hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-crusoe-400 to-crusoe-500 rounded-full mb-6 text-3xl shadow-lg">
                🕒
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Horarios</h3>
              <p className="text-gray-200 text-lg leading-relaxed font-medium">
                <span className="text-crusoe-300">Lunes a Viernes</span><br />
                10:00 - 20:00<br />
                <span className="text-crusoe-300">Sábados y Domingos</span><br />
                9:00 - 21:00
              </p>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-crusoe-600/30 rounded-2xl p-8 text-center hover:bg-gradient-to-br hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-crusoe-400 to-crusoe-500 rounded-full mb-6 text-3xl shadow-lg">
                🎁
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Especialidades</h3>
              <p className="text-gray-200 text-lg leading-relaxed font-medium">
                <span className="text-crusoe-300">Figuras exclusivas</span><br />
                Libros de arte oficiales<br />
                <span className="text-crusoe-300">Merchandising único</span><br />
                Ediciones limitadas
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Thumbnails */}
      <section className="py-20" style={{backgroundColor: '#b8f0d1'}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-crusoe-900 mb-4">
              Galería de la Tienda
            </h2>
            <p className="text-lg text-crusoe-700">
              Echa un vistazo a nuestro espacio mágico
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`group relative aspect-square rounded-xl overflow-hidden transition-all duration-300 bg-gradient-to-br from-crusoe-800 to-crusoe-900 p-1 ${
                  index === currentSlide
                    ? "ring-4 ring-crusoe-400 scale-105 shadow-2xl"
                    : "hover:scale-105 hover:shadow-xl"
                }`}
              >
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-crusoe-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{image.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-crusoe-900 to-gray-800">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">
            ¡Tu Aventura Ghibli Te Espera!
          </h2>
          <p className="text-xl text-gray-200 mb-10 leading-relaxed font-medium">
            Sumérgete en un mundo donde cada producto cuenta una historia y cada rincón 
            está lleno de magia. Ven y descubre por qué somos el destino favorito de 
            los fanáticos de Studio Ghibli.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-gradient-to-r from-crusoe-500 to-crusoe-600 hover:from-crusoe-400 hover:to-crusoe-500 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-crusoe-500/25">
              <span className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-3 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Cómo Llegar
              </span>
            </button>
            
            <button className="group bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 border-2 border-crusoe-400 text-white px-10 py-5 rounded-full font-bold text-xl shadow-2xl transition-all duration-300 transform hover:scale-105">
              <span className="flex items-center justify-center">
                <svg className="w-6 h-6 mr-3 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contactar Ahora
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TiendaFisica;