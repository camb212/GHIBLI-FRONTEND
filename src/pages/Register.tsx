import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, CheckCircle, AlertCircle } from 'lucide-react';

// Interfaces para tipado
interface FormData {
  nombre: string;
  correo: string;
  celular: string;
  username: string;
  password: string;
}

interface FormErrors {
  nombre?: string;
  correo?: string;
  celular?: string;
  username?: string;
  password?: string;
}

interface Message {
  type: 'success' | 'error' | '';
  text: string;
}

interface RegisterResponse {
  success: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    correo: '',
    celular: '',
    username: '',
    password: ''
  });
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<Message>({ type: '', text: '' });

  // Validación de email
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validación de formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }
    
    if (!formData.correo) {
      newErrors.correo = 'El correo es requerido';
    } else if (!isValidEmail(formData.correo)) {
      newErrors.correo = 'Por favor ingresa un correo válido';
    }
    
    if (!formData.celular) {
      newErrors.celular = 'El celular es requerido';
    } else if (!/^\d{10,}$/.test(formData.celular)) {
      newErrors.celular = 'El celular debe tener al menos 10 dígitos';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejar cambios en inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error específico cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Función de registro (simula API call)
  const registerUser = async (userData: FormData): Promise<any> => {
    const response = await fetch('http://localhost:3010/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar usuario');
    }
    return await response.json();
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await registerUser(formData);
      
      setMessage({
        type: 'success',
        text: '¡Registro exitoso! Bienvenido ' + formData.nombre
      });
      
      // Simular redirección después de 2 segundos
      setTimeout(() => {
        console.log('Redirigiendo al dashboard...');
        // Aquí iría la redirección real: window.location.href = '/dashboard'
      }, 2000);
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al registrar usuario';
      setMessage({
        type: 'error',
        text: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-900 mb-2">Crear Cuenta</h1>
          <p className="text-green-700">Únete a nuestra comunidad</p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-green-900 mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.nombre ? 'border-red-400 focus:border-red-500' : 'border-green-200 focus:border-green-500'}`}
                  placeholder="Tu nombre completo"
                />
              </div>
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.nombre}
                </p>
              )}
            </div>

            {/* Input Correo */}
            <div>
              <label htmlFor="correo" className="block text-sm font-medium text-green-900 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.correo ? 'border-red-400 focus:border-red-500' : 'border-green-200 focus:border-green-500'}`}
                  placeholder="tu@correo.com"
                />
              </div>
              {errors.correo && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.correo}
                </p>
              )}
            </div>

            {/* Input Celular */}
            <div>
              <label htmlFor="celular" className="block text-sm font-medium text-green-900 mb-2">
                Celular
              </label>
              <div className="relative">
                <input
                  type="tel"
                  id="celular"
                  name="celular"
                  value={formData.celular}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.celular ? 'border-red-400 focus:border-red-500' : 'border-green-200 focus:border-green-500'}`}
                  placeholder="5551234567"
                />
              </div>
              {errors.celular && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.celular}
                </p>
              )}
            </div>

            {/* Input Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-green-900 mb-2">
                Nombre de usuario
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.username ? 'border-red-400 focus:border-red-500' : 'border-green-200 focus:border-green-500'}`}
                  placeholder="satsuki"
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Input Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-green-900 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.password ? 'border-red-400 focus:border-red-500' : 'border-green-200 focus:border-green-500'}`}
                  placeholder="Tu contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 hover:text-green-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Mensaje de estado */}
            {message.text && (
              <div className={`p-4 rounded-lg flex items-center ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {message.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                {message.text}
              </div>
            )}

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                isLoading
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 active:bg-green-800'
              } focus:outline-none focus:ring-4 focus:ring-green-300`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Creando cuenta...
                </div>
              ) : (
                'Crear cuenta'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-green-700">
              ¿Ya tienes cuenta?{' '}
              <a 
                href="/login" 
                type="button"
                className="text-green-600 hover:text-green-800 font-semibold underline"
                onClick={() => console.log('Navegar a login')}
              >
                Iniciar sesión
              </a>
            </p>
          </div>
        </div>

        {/* Info adicional */}
        <div className="mt-6 text-center text-sm text-green-600">
          <p>Al registrarte, aceptas nuestros términos y condiciones</p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;