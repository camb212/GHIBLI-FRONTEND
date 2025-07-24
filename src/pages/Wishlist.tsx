import { useState, useEffect } from 'react';
import { Heart, X, Plus, Star, Gift } from 'lucide-react';

// Interfaces para TypeScript
interface PlushieItem {
  id: string;
  name: string;
  price: string;
  image: string;
  addedDate?: string;
}

interface Wishlist {
  userId: string;
  items: PlushieItem[];
}

const WishlistComponent = () => {
  const [wishlist, setWishlist] = useState<Wishlist>({ userId: '', items: [] });
  const [userId] = useState<string>('user123'); // ID de usuario simulado
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  
  // Datos de peluches simulados para agregar
  const availablePlushies: PlushieItem[] = [
    { id: 'plush1', name: 'Osito Teddy', price: '$25.99', image: '🧸' },
    { id: 'plush2', name: 'Unicornio Mágico', price: '$35.50', image: '🦄' },
    { id: 'plush3', name: 'Gatito Peludo', price: '$28.00', image: '🐱' },
    { id: 'plush4', name: 'Conejito Suave', price: '$22.75', image: '🐰' },
    { id: 'plush5', name: 'Pingüino Adorable', price: '$30.25', image: '🐧' }
  ];

  // Simular llamada al backend para obtener wishlist
  const fetchWishlist = async (): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulamos respuesta del backend
      setTimeout(() => {
        const mockWishlist: Wishlist = {
          userId: userId,
          items: [
            { id: 'plush1', name: 'Osito Teddy', price: '$25.99', image: '🧸', addedDate: '2024-01-15' },
            { id: 'plush3', name: 'Gatito Peludo', price: '$28.00', image: '🐱', addedDate: '2024-01-20' }
          ]
        };
        setWishlist(mockWishlist);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      setMessage('Error al cargar la lista de deseos');
      setIsLoading(false);
    }
  };

  // Simular llamada al backend para agregar peluche
  const addToWishlist = async (plushieId: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Simulamos POST a /wishlist
      const plushie = availablePlushies.find(p => p.id === plushieId);
      if (!plushie) {
        setMessage('Peluche no encontrado');
        setIsLoading(false);
        return;
      }
      
      setTimeout(() => {
        const newItem: PlushieItem = {
          ...plushie,
          addedDate: new Date().toISOString().split('T')[0]
        };
        
        setWishlist(prev => ({
          ...prev,
          items: [...prev.items, newItem]
        }));
        
        setMessage(`¡${plushie.name} agregado a tu lista de deseos!`);
        setIsLoading(false);
        
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setMessage(''), 3000);
      }, 800);
    } catch (error) {
      setMessage('Error al agregar el peluche');
      setIsLoading(false);
    }
  };

  // Función para simular eliminación (no existe en backend original)
  const removeFromWishlist = (plushieId: string): void => {
    setWishlist(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== plushieId)
    }));
    setMessage('Peluche eliminado de la lista de deseos');
    setTimeout(() => setMessage(''), 3000);
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const isInWishlist = (plushieId: string): boolean => {
    return wishlist.items.some(item => item.id === plushieId);
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-[#e0fff4] to-[#b3fcd9] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="text-crusoe-600 w-10 h-10" />
            <h1 className="text-4xl font-bold text-crusoe-800">Mi Lista de Deseos</h1>
            <Heart className="text-crusoe-500 w-8 h-8" />
          </div>
          <p className="text-crusoe-600 text-lg">Todos tus peluches favoritos en un solo lugar</p>
        </div>

        {/* Mensaje de estado */}
        {message && (
          <div className="bg-crusoe-200 border border-crusoe-400 text-crusoe-800 px-4 py-3 rounded-lg mb-6 text-center">
            {message}
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-crusoe-600"></div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Lista de deseos actual */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-crusoe-200">
            <h2 className="text-2xl font-semibold text-crusoe-800 mb-6 flex items-center gap-2">
              <Star className="text-crusoe-500 w-6 h-6" />
              Mis Peluches Deseados ({wishlist.items.length})
            </h2>
            
            {wishlist.items.length === 0 ? (
              <div className="text-center py-12">
                <Heart className="mx-auto w-16 h-16 text-crusoe-300 mb-4" />
                <p className="text-crusoe-500 text-lg">Tu lista de deseos está vacía</p>
                <p className="text-crusoe-400">¡Agrega algunos peluches adorables!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {wishlist.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 bg-crusoe-50 rounded-xl border border-crusoe-200 hover:shadow-md transition-shadow">
                    <div className="text-4xl">{item.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-crusoe-800">{item.name}</h3>
                      <p className="text-crusoe-600 font-medium">{item.price}</p>
                      <p className="text-crusoe-400 text-sm">Agregado: {item.addedDate}</p>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 text-crusoe-500 hover:text-crusoe-700 hover:bg-crusoe-100 rounded-full transition-colors"
                      title="Eliminar de la lista"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Peluches disponibles para agregar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-crusoe-200">
            <h2 className="text-2xl font-semibold text-crusoe-800 mb-6 flex items-center gap-2">
              <Plus className="text-crusoe-500 w-6 h-6" />
              Agregar Peluches
            </h2>
            
            <div className="space-y-4">
              {availablePlushies.map((plushie) => (
                <div key={plushie.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="text-4xl">{plushie.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-crusoe-800">{plushie.name}</h3>
                    <p className="text-crusoe-600 font-medium">{plushie.price}</p>
                  </div>
                  <button
                    onClick={() => addToWishlist(plushie.id)}
                    disabled={isInWishlist(plushie.id) || isLoading}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      isInWishlist(plushie.id)
                        ? 'bg-crusoe-200 text-crusoe-600 cursor-not-allowed'
                        : 'bg-crusoe-600 text-white hover:bg-crusoe-700 active:bg-crusoe-800'
                    }`}
                  >
                    {isInWishlist(plushie.id) ? (
                      <span className="flex items-center gap-2">
                        <Heart className="w-4 h-4 fill-current" />
                        En Lista
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Plus className="w-4 h-4" />
                        Agregar
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer con información */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-crusoe-200">
            <h3 className="text-lg font-semibold text-crusoe-800 mb-2">💝 Información</h3>
            <p className="text-crusoe-600">
              Usuario: <span className="font-medium text-crusoe-800">{userId}</span>
            </p>
            <p className="text-crusoe-500 text-sm mt-2">
              Guarda todos tus peluches favoritos y nunca olvides cuáles quieres comprar
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .bg-crusoe-50 { background-color: #eefff0; }
        .bg-crusoe-100 { background-color: #d8ffde; }
        .bg-crusoe-200 { background-color: #b4febf; }
        .bg-crusoe-300 { background-color: #7afb8f; }
        .bg-crusoe-400 { background-color: #39ef56; }
        .bg-crusoe-500 { background-color: #0fd830; }
        .bg-crusoe-600 { background-color: #05b422; }
        .bg-crusoe-700 { background-color: #088d1f; }
        .bg-crusoe-800 { background-color: #0d6e1e; }
        .bg-crusoe-900 { background-color: #0a4816; }
        .bg-crusoe-950 { background-color: #00330b; }
        
        .text-crusoe-50 { color: #eefff0; }
        .text-crusoe-100 { color: #d8ffde; }
        .text-crusoe-200 { color: #b4febf; }
        .text-crusoe-300 { color: #7afb8f; }
        .text-crusoe-400 { color: #39ef56; }
        .text-crusoe-500 { color: #0fd830; }
        .text-crusoe-600 { color: #05b422; }
        .text-crusoe-700 { color: #088d1f; }
        .text-crusoe-800 { color: #0d6e1e; }
        .text-crusoe-900 { color: #0a4816; }
        .text-crusoe-950 { color: #00330b; }
        
        .border-crusoe-200 { border-color: #b4febf; }
        .border-crusoe-400 { border-color: #39ef56; }
        
        .hover\\:bg-crusoe-100:hover { background-color: #d8ffde; }
        .hover\\:bg-crusoe-700:hover { background-color: #088d1f; }
        .hover\\:text-crusoe-700:hover { color: #088d1f; }
        .active\\:bg-crusoe-800:active { background-color: #0d6e1e; }
      `}</style>
    </div>
  );
};

export default WishlistComponent;