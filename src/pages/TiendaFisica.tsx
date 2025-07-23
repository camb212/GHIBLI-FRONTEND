import React, { useState, useEffect } from "react";

const TiendaFisica: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      url: "/imagenes/if1.jpg",
      title: "Entrada Principal",
      description: "Bienvenido a nuestro mundo mágico",
    },
    {
      url: "/imagenes/if2.jpg",
      title: "Área de Figuras",
      description: "Colección completa de personajes Ghibli",
    },
    {
      url: "/imagenes/p6.jpg",
      title: "Sección de Libros",
      description: "Arte y literatura del Studio Ghibli",
    },
    {
      url: "/imagenes/tienda1.jpg",
      title: "Rincón Totoro",
      description: "Productos exclusivos de Mi Vecino Totoro",
    },
    {
      url: "/imagenes/tienda2.jpg",
      title: "Vista General",
      description: "Ambiente acogedor y mágico",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <span className="text-3xl">🏪</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestra Tienda Física</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Un espacio mágico donde los sueños de Studio Ghibli cobran vida
          </p>
        </div>

        {/* Carousel */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="relative h-[500px] lg:h-[600px]">
            {/* Image */}
            <div className="absolute inset-0">
              <img
                src={images[currentSlide].url}
                alt={images[currentSlide].title}
                className="w-full h-full object-cover transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            </div>

            {/* Text Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/70 to-transparent">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">{images[currentSlide].title}</h3>
                <p className="text-lg opacity-90">{images[currentSlide].description}</p>
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? "bg-white scale-125"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex justify-center space-x-4 mb-12 overflow-x-auto pb-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                index === currentSlide
                  ? "ring-4 ring-green-500 scale-110"
                  : "hover:scale-105 opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl mb-4">📍</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Ubicación</h3>
            <p className="text-gray-600">Centro Comercial Mágico, Local 15B</p>
            <p className="text-gray-600">Ciudad Encantada, Piso 2</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl mb-4">🕒</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Horarios</h3>
            <p className="text-gray-600">Lunes a Viernes: 10:00 - 20:00</p>
            <p className="text-gray-600">Sábados y Domingos: 9:00 - 21:00</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl mb-4">🎁</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Especialidades</h3>
            <p className="text-gray-600">Figuras exclusivas, libros de arte</p>
            <p className="text-gray-600">Merchandising oficial Ghibli</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">¡Ven a visitarnos!</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
            Descubre todos los productos Ghibli en un ambiente mágico lleno de detalles únicos.
            Cada rincón de nuestra tienda está diseñado para transportarte al mundo de Studio Ghibli.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Ver Ubicación
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Contactar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TiendaFisica;
