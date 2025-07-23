// src/components/ProductCard.tsx
import React from 'react';
import { Heart, HeartOff, Eye } from 'lucide-react';

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  price: number;
  originalPrice?: number;
  isOnSale?: boolean;
  rating?: number;
  reviewCount?: number;
  category?: string;
  isFavorite?: boolean;
  isInStock?: boolean;
  onAddToCart?: (id: string) => void;
  onToggleFavorite?: (id: string) => void;
  onQuickView?: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  originalPrice,
  isOnSale,
  rating,
  reviewCount,
  category,
  isFavorite,
  isInStock = true,
  onAddToCart,
  onToggleFavorite,
  onQuickView,
}) => {
  return (
    <div className="relative bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-green-200 dark:border-green-800 overflow-hidden transform hover:scale-105 transition-transform duration-300">
      {/* Etiqueta de oferta */}
      {isOnSale && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
          Oferta
        </div>
      )}

      {/* Botón de favoritos */}
      {onToggleFavorite && (
        <button
          onClick={() => onToggleFavorite(id)}
          className="absolute top-2 right-2 p-1 rounded-full bg-white dark:bg-neutral-800 shadow hover:scale-110 transition"
        >
          {isFavorite ? (
            <Heart className="text-red-500 w-5 h-5" fill="red" />
          ) : (
            <HeartOff className="text-gray-500 w-5 h-5" />
          )}
        </button>
      )}

      {/* Imagen */}
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
      />

      {/* Contenido */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold text-green-800 dark:text-green-400">{name}</h3>

        {category && (
          <p className="text-xs text-gray-400 uppercase tracking-wide">{category}</p>
        )}

        {/* Precio */}
        <div className="flex items-center space-x-2">
          <span className="text-green-800 dark:text-green-400 font-bold text-md">
            ${price.toFixed(2)}
          </span>
          {isOnSale && originalPrice && (
            <span className="line-through text-sm text-gray-400">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Valoración */}
        {rating && reviewCount && (
          <div className="text-sm text-yellow-600 dark:text-yellow-400">
            ⭐ {rating.toFixed(1)} ({reviewCount})
          </div>
        )}

        {/* Botones */}
        <div className="flex flex-col gap-2 mt-2">
          <button
            onClick={() => onAddToCart?.(id)}
            className="bg-green-700 text-white py-2 rounded-xl hover:bg-green-600 transition"
            disabled={!isInStock}
          >
            {isInStock ? 'Añadir al carrito' : 'Agotado'}
          </button>
          {onQuickView && (
            <button
              onClick={() => onQuickView(id)}
              className="flex justify-center items-center gap-1 text-sm text-green-600 dark:text-green-300 hover:underline"
            >
              <Eye className="w-4 h-4" />
              Vista rápida
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
