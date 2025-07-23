// Login page
import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      localStorage.setItem('token', res.data.access_token);
      alert('Login exitoso');
    } catch (e) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered w-full max-w-xs mb-2"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs mb-2"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSubmit}>Iniciar sesión</button>
    </div>
  );
}
