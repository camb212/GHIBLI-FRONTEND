import React, { useState } from 'react';
import { ShoppingCart, Package, Calendar, DollarSign, Plus, Minus, Trash2, CheckCircle } from 'lucide-react';

// Paleta de colores Crusoe personalizada
const style = document.createElement('style');
style.textContent = `
  :root {
--crusoe-50: #e6fff3;   /* Verde menta muy suave */
--crusoe-100: #ccffea;  /* Verde menta suave */
    --crusoe-200: #b4febf;
    --crusoe-300: #7afb8f;
    --crusoe-400: #39ef56;
    --crusoe-500: #0fd830;
    --crusoe-600: #05b422;
    --crusoe-700: #088d1f;
    --crusoe-800: #0d6e1e;
    --crusoe-900: #0a4816;
    --crusoe-950: #00330b;
  }
  
  .bg-crusoe-50 { background-color: var(--crusoe-50); }
  .bg-crusoe-100 { background-color: var(--crusoe-100); }
  .bg-crusoe-200 { background-color: var(--crusoe-200); }
  .bg-crusoe-300 { background-color: var(--crusoe-300); }
  .bg-crusoe-400 { background-color: var(--crusoe-400); }
  .bg-crusoe-500 { background-color: var(--crusoe-500); }
  .bg-crusoe-600 { background-color: var(--crusoe-600); }
  .bg-crusoe-700 { background-color: var(--crusoe-700); }
  .bg-crusoe-800 { background-color: var(--crusoe-800); }
  .bg-crusoe-900 { background-color: var(--crusoe-900); }
  .bg-crusoe-950 { background-color: var(--crusoe-950); }
  
  .text-crusoe-50 { color: var(--crusoe-50); }
  .text-crusoe-100 { color: var(--crusoe-100); }
  .text-crusoe-200 { color: var(--crusoe-200); }
  .text-crusoe-300 { color: var(--crusoe-300); }
  .text-crusoe-400 { color: var(--crusoe-400); }
  .text-crusoe-500 { color: var(--crusoe-500); }
  .text-crusoe-600 { color: var(--crusoe-600); }
  .text-crusoe-700 { color: var(--crusoe-700); }
  .text-crusoe-800 { color: var(--crusoe-800); }
  .text-crusoe-900 { color: var(--crusoe-900); }
  .text-crusoe-950 { color: var(--crusoe-950); }
  
  .border-crusoe-50 { border-color: var(--crusoe-50); }
  .border-crusoe-100 { border-color: var(--crusoe-100); }
  .border-crusoe-200 { border-color: var(--crusoe-200); }
  .border-crusoe-300 { border-color: var(--crusoe-300); }
  .border-crusoe-400 { border-color: var(--crusoe-400); }
  .border-crusoe-500 { border-color: var(--crusoe-500); }
  .border-crusoe-600 { border-color: var(--crusoe-600); }
  .border-crusoe-700 { border-color: var(--crusoe-700); }
  .border-crusoe-800 { border-color: var(--crusoe-800); }
  .border-crusoe-900 { border-color: var(--crusoe-900); }
  .border-crusoe-950 { border-color: var(--crusoe-950); }
  
  .hover\\:bg-crusoe-100:hover { background-color: var(--crusoe-100); }
  .hover\\:bg-crusoe-200:hover { background-color: var(--crusoe-200); }
  .hover\\:bg-crusoe-300:hover { background-color: var(--crusoe-300); }
  .hover\\:bg-crusoe-400:hover { background-color: var(--crusoe-400); }
  .hover\\:bg-crusoe-500:hover { background-color: var(--crusoe-500); }
  .hover\\:bg-crusoe-600:hover { background-color: var(--crusoe-600); }
  .hover\\:bg-crusoe-700:hover { background-color: var(--crusoe-700); }
  .hover\\:bg-crusoe-800:hover { background-color: var(--crusoe-800); }
  
  .from-crusoe-50 { --tw-gradient-from: var(--crusoe-50); }
  .to-crusoe-100 { --tw-gradient-to: var(--crusoe-100); }
  .from-crusoe-100 { --tw-gradient-from: var(--crusoe-100); }
  .to-crusoe-200 { --tw-gradient-to: var(--crusoe-200); }
`;
document.head.appendChild(style);

// Interfaces y tipos
interface Plushie {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface CartItem {
  plushieId: string;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}

interface OrderItemProps {
  order: Order;
}

interface OrdersListProps {
  userId: string;
  orders: Order[];
}

interface CreateOrderFormProps {
  cart: CartItem[];
  onOrderCreated: (order: Order) => void;
  userId: string;
}

interface CartComponentProps {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onCreateOrder: (order: Order) => void;
}

// Simulación de datos de peluches
const plushies: Plushie[] = [
  { id: '1', name: 'Osito Teddy', price: 25.99, image: '🧸' },
  { id: '2', name: 'Unicornio Mágico', price: 32.50, image: '🦄' },
  { id: '3', name: 'Dragón Amigable', price: 28.75, image: '🐉' },
  { id: '4', name: 'Gatito Sleepy', price: 22.00, image: '😺' },
];

// Componente OrderItem - Detalle de cada orden
const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-crusoe-200 p-6 mb-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-crusoe-100 p-2 rounded-lg">
            <Package className="w-5 h-5 text-crusoe-600" />
          </div>
          <div>
            <h3 className="font-semibold text-crusoe-900">Orden #{order.id}</h3>
            <div className="flex items-center gap-2 text-sm text-crusoe-600">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(order.createdAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-crusoe-700 font-bold">
          <DollarSign className="w-5 h-5" />
          <span className="text-xl">${order.total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border-t border-crusoe-100 pt-4">
        <h4 className="font-medium text-crusoe-800 mb-3">Items ordenados:</h4>
        <div className="space-y-2">
          {order.items.map((item: CartItem, index: number) => {
            const plushie = plushies.find((p: Plushie) => p.id === item.plushieId);
            return (
              <div key={index} className="flex items-center justify-between bg-crusoe-50 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{plushie?.image}</span>
                  <div>
                    <span className="font-medium text-crusoe-800">{plushie?.name}</span>
                    <span className="text-crusoe-600 ml-2">x{item.quantity}</span>
                  </div>
                </div>
                <span className="font-semibold text-crusoe-700">
                  ${((plushie?.price || 0) * item.quantity).toFixed(2)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Componente OrdersList - Lista de órdenes del usuario
const OrdersList: React.FC<OrdersListProps> = ({ userId, orders }) => {
  const userOrders = orders.filter((order: Order) => order.userId === userId);

  if (userOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-crusoe-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-crusoe-700 mb-2">No tienes órdenes aún</h3>
        <p className="text-crusoe-500">¡Agrega algunos peluches al carrito y haz tu primera orden!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-crusoe-500 p-3 rounded-lg">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-crusoe-900">Mis Órdenes</h2>
          <p className="text-crusoe-600">{userOrders.length} orden{userOrders.length !== 1 ? 'es' : ''} encontrada{userOrders.length !== 1 ? 's' : ''}</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {userOrders
          .sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((order: Order) => (
            <OrderItem key={order.id} order={order} />
          ))}
      </div>
    </div>
  );
};

// Componente CreateOrderForm - Funcionalidad para crear órdenes
const CreateOrderForm: React.FC<CreateOrderFormProps> = ({ cart, onOrderCreated, userId }) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  
  const total = cart.reduce((sum: number, item: CartItem) => {
    const plushie = plushies.find((p: Plushie) => p.id === item.plushieId);
    return sum + (plushie?.price || 0) * item.quantity;
  }, 0);

  const handleCreateOrder = async (): Promise<void> => {
    if (cart.length === 0) return;
    
    setIsCreating(true);
    
    // Simulación de llamada a POST /orders
    setTimeout(() => {
      const newOrder: Order = {
        id: Date.now().toString(),
        userId,
        items: [...cart],
        total,
        createdAt: new Date().toISOString()
      };
      
      onOrderCreated(newOrder);
      setIsCreating(false);
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-8">
        <ShoppingCart className="w-16 h-16 text-crusoe-300 mx-auto mb-4" />
        <p className="text-crusoe-600">Tu carrito está vacío</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-crusoe-200 p-6">
      <h3 className="text-xl font-bold text-crusoe-900 mb-4">Resumen de tu orden</h3>
      
      <div className="space-y-3 mb-6">
        {cart.map((item: CartItem, index: number) => {
          const plushie = plushies.find((p: Plushie) => p.id === item.plushieId);
          return (
            <div key={index} className="flex items-center justify-between bg-crusoe-50 p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{plushie?.image}</span>
                <div>
                  <span className="font-medium text-crusoe-800">{plushie?.name}</span>
                  <span className="text-crusoe-600 ml-2">x{item.quantity}</span>
                </div>
              </div>
              <span className="font-semibold text-crusoe-700">
                ${((plushie?.price || 0) * item.quantity).toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="border-t border-crusoe-200 pt-4 mb-6">
        <div className="flex items-center justify-between text-xl font-bold text-crusoe-900">
          <span>Total:</span>
          <span className="text-crusoe-600">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        onClick={handleCreateOrder}
        disabled={isCreating}
        className="w-full bg-crusoe-500 hover:bg-crusoe-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isCreating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Creando orden...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            Realizar Pedido
          </>
        )}
      </button>
    </div>
  );
};

// Componente principal del carrito
const CartComponent: React.FC<CartComponentProps> = ({ cart, setCart, onCreateOrder }) => {
  const updateQuantity = (plushieId: string, newQuantity: number): void => {
    if (newQuantity <= 0) {
      setCart(cart.filter((item: CartItem) => item.plushieId !== plushieId));
    } else {
      setCart(cart.map((item: CartItem) => 
        item.plushieId === plushieId 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    }
  };

  const removeItem = (plushieId: string): void => {
    setCart(cart.filter((item: CartItem) => item.plushieId !== plushieId));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-crusoe-500 p-3 rounded-lg">
          <ShoppingCart className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-crusoe-900">Carrito de Compras</h2>
          <p className="text-crusoe-600">{cart.length} item{cart.length !== 1 ? 's' : ''} en tu carrito</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {cart.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <ShoppingCart className="w-16 h-16 text-crusoe-300 mx-auto mb-4" />
              <p className="text-crusoe-600">Tu carrito está vacío</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item: CartItem, index: number) => {
                const plushie = plushies.find((p: Plushie) => p.id === item.plushieId);
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-crusoe-200 p-4">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{plushie?.image}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-crusoe-900">{plushie?.name}</h3>
                        <p className="text-crusoe-600">${plushie?.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.plushieId, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-crusoe-100 hover:bg-crusoe-200 text-crusoe-600 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold text-crusoe-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.plushieId, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-crusoe-100 hover:bg-crusoe-200 text-crusoe-600 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.plushieId)}
                        className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 text-red-600 flex items-center justify-center transition-colors ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        
        <div>
          <CreateOrderForm 
            cart={cart} 
            onOrderCreated={onCreateOrder}
            userId="user123"
          />
        </div>
      </div>
    </div>
  );
};

// Componente principal de la aplicación
const OrdersApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<'catalog' | 'cart' | 'orders'>('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      userId: 'user123',
      items: [
        { plushieId: '1', quantity: 2 },
        { plushieId: '3', quantity: 1 }
      ],
      total: 80.73,
      createdAt: '2025-01-15T10:30:00Z'
    }
  ]);
  const userId = 'user123';

  const addToCart = (plushieId: string): void => {
    const existingItem = cart.find((item: CartItem) => item.plushieId === plushieId);
    if (existingItem) {
      setCart(cart.map((item: CartItem) => 
        item.plushieId === plushieId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { plushieId, quantity: 1 }]);
    }
  };

  const handleOrderCreated = (newOrder: Order): void => {
    setOrders([...orders, newOrder]);
    setCart([]); // Limpiar carrito después de crear orden
    setCurrentView('orders'); // Ir a la vista de órdenes
  };

  const cartItemCount = cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0);

  return (
<div className="min-h-screen bg-[#d9fff5]">
      {/* Navegación */}
      <nav className="bg-white shadow-sm border-b border-crusoe-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🧸</span>
              <span className="text-xl font-bold text-crusoe-900">PlushieStore</span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentView('catalog')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'catalog'
                    ? 'bg-crusoe-500 text-white'
                    : 'text-crusoe-700 hover:bg-crusoe-100'
                }`}
              >
                Catálogo
              </button>
              <button
                onClick={() => setCurrentView('cart')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                  currentView === 'cart'
                    ? 'bg-crusoe-500 text-white'
                    : 'text-crusoe-700 hover:bg-crusoe-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Carrito
                  {cartItemCount > 0 && (
                    <span className="bg-crusoe-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
              </button>
              <button
                onClick={() => setCurrentView('orders')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'orders'
                    ? 'bg-crusoe-500 text-white'
                    : 'text-crusoe-700 hover:bg-crusoe-100'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Mis Órdenes
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {currentView === 'catalog' && (
          <div>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-crusoe-900 mb-2">Catálogo de Peluches</h1>
              <p className="text-crusoe-600">Encuentra tu compañero perfecto</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plushies.map((plushie: Plushie) => (
                <div key={plushie.id} className="bg-white rounded-xl shadow-sm border border-crusoe-200 p-6 hover:shadow-md transition-shadow">
                  <div className="text-center mb-4">
                    <span className="text-6xl block mb-2">{plushie.image}</span>
                    <h3 className="font-semibold text-crusoe-900">{plushie.name}</h3>
                    <p className="text-crusoe-600 font-bold">${plushie.price}</p>
                  </div>
                  <button
                    onClick={() => addToCart(plushie.id)}
                    className="w-full bg-crusoe-500 hover:bg-crusoe-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'cart' && (
          <CartComponent 
            cart={cart} 
            setCart={setCart}
            onCreateOrder={handleOrderCreated}
          />
        )}

        {currentView === 'orders' && (
          <OrdersList userId={userId} orders={orders} />
        )}
      </div>
    </div>
  );
};

export default OrdersApp;