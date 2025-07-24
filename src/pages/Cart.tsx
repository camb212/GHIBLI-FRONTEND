// src/pages/Cart.tsx

const Cart = () => {
  // Datos quemados del carrito
  const cartItems = [
    {
      id: '1',
      name: 'Totoro Gigante',
      price: 29.99,
      quantity: 2,
      image: '/imagenes/totoro.webp',
    },
    {
      id: '2',
      name: 'Calcifer Mágico',
      price: 24.99,
      quantity: 1,
      image: '/imagenes/calsifer.jpg',
    },
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map(item => (
              <li key={item.id} className="flex items-center gap-4 border p-4 rounded-lg">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded" />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p>Cantidad: {item.quantity}</p>
                  <p>Precio unitario: ${item.price.toFixed(2)}</p>
                </div>
                <div className="font-bold text-green-700">${(item.price * item.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right text-xl font-bold">
            Total: ${totalPrice.toFixed(2)}
          </div>
          <button
            className="mt-4 px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-600 transition"
            onClick={() => alert('Checkout no implementado')}
          >
            Pagar Ahora
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
