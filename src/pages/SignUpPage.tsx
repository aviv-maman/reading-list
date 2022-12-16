import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createApiClient } from '../api/api';
import { GlobalActionKeys } from '../core/context/action';
import { useGlobalContext } from '../core/context/initialContextState';

//API calls
const api = createApiClient();

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      const res = await api.signUp({ email, password });
      console.log(res);
      if (res.user.email) {
        dispatch({ type: GlobalActionKeys.UpdateUser, payload: res.user });
        navigate('/');
      } else {
        throw new Error(`${res.code}: ${res.message}`);
      }
    } catch (error: any) {
      setError(error.message);
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
