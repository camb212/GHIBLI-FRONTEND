// src/components/ProductCard.tsx

interface ProductCardProps {
  image: string;
  name: string;
  price: number;
}

const ProductCard = ({ image, name, price }: ProductCardProps) => {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-green-100 dark:border-green-800 transform hover:scale-105">
      <img
        src={image}
        alt={name}
        className="w-full h-64 object-cover hover:scale-110 transition-transform duration-500"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-green-800 dark:text-green-400">{name}</h3>
        <p className="text-brown-700 dark:text-brown-200 font-semibold">${price.toFixed(2)}</p>
        <button className="mt-3 w-full bg-green-700 text-white py-2 rounded-xl hover:bg-green-600 transition">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
