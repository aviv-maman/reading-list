import { Link, useNavigate } from 'react-router-dom';
import { createApiClient } from '../api/api';
import { GlobalActionKeys } from '../core/context/action';
import { useGlobalContext } from '../core/context/initialContextState';
import LanguageDropdown from './LanguageDropdown';
import ThemeSelector from './ThemeSelector';

//API calls
const api = createApiClient();

export default function MainNavBar() {
  const navigate = useNavigate();
  const { dispatch } = useGlobalContext();

  const handleLogout = () => {
    try {
      const res = api.logOut();
      console.log(res);
      if (res.message) {
        dispatch({ type: GlobalActionKeys.UpdateUser, payload: null });
        navigate('/');
      } else {
        throw new Error(`${res.code}: ${res.message}`);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <nav>
      <h1>My Reading List</h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Sign Up</Link>
        </li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
      <ThemeSelector />
      <LanguageDropdown />
    </nav>
  );
}
