// ProductCard component code here
import { FC } from 'react';

interface Props {
  name: string;
  price: number;
  description: string;
  image: string;
  onAddToCart: () => void;
  onAddToWishlist: () => void;
}

const ProductCard: FC<Props> = ({ name, price, description, image, onAddToCart, onAddToWishlist }) => {
  return (
    <div className="card w-72 bg-base-100 shadow-xl">
      <figure><img src={image} alt={name} /></figure>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
        <p className="font-bold">${price}</p>
        <div className="card-actions justify-end">
          <button onClick={onAddToCart} className="btn btn-primary">Agregar al carrito</button>
          <button onClick={onAddToWishlist} className="btn btn-secondary">Wishlist</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
