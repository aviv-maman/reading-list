import { useState } from 'react';
import { createApiClient } from '../api/api';

//API calls
const api = createApiClient();

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.signUp({ email, password });
      console.log(`A user signed up: ${res.user}`);
    } catch (error: any) {
      setError(error.message);
      console.log(`Error signing up: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email:</span>
          <input required type='email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </label>
        <label>
          <span>Password:</span>
          <input required type='password' onChange={(e) => setPassword(e.target.value)} value={password} />
        </label>
        <button>Sign Up</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
