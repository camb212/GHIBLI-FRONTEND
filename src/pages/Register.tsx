// Register page
import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:3000/users', {
        username,
        password,
        email,
      });
      alert('Registro exitoso, ahora puedes iniciar sesión');
    } catch (e) {
      alert('Error al registrarse');
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
        type="email"
        placeholder="Email"
        className="input input-bordered w-full max-w-xs mb-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs mb-2"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleRegister}>Registrarse</button>
    </div>
  );
}
