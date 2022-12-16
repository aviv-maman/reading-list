import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createApiClient } from '../api/api';
import { GlobalActionKeys } from '../core/context/action';
import { useGlobalContext } from '../core/context/initialContextState';

//API calls
const api = createApiClient();

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    try {
      const res = await api.logIn({ email, password });
      console.log(res);
      if (res.user.email) {
        dispatch({ type: GlobalActionKeys.UpdateUser, payload: res.user });
        // Send them back to the page they tried to visit when they were
        // redirected to the login page. Use { replace: true } so we don't create
        // another entry in the history stack for the login page.  This means that
        // when they get to the protected page and click the back button, they
        // won't end up back on the login page, which is also really nice for the
        // user experience.
        navigate(from, { replace: true });
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
