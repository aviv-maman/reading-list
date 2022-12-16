import { useState } from 'react';
import { createApiClient } from '../api/api';

//API calls
const api = createApiClient();

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.logIn({ email, password });
      if (res.status === 201) {
        console.log(`A user logged in: ${res.user}`);
      } else {
        throw new Error(`${res.code}: ${res.message}`);
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input required type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </label>
        <label>
          <span>Password:</span>
          <input required type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
        </label>
        <button>Log In</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
