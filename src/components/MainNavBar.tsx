import { NavLink, useNavigate } from 'react-router-dom';
import { createApiClient } from '../api/api';
import { GlobalActionKeys } from '../core/context/action';
import { useGlobalContext } from '../core/context/initialContextState';
import LanguageDropdown from './LanguageDropdown';
import ThemeSelector from './ThemeSelector';

//API calls
const api = createApiClient();

export default function MainNavBar() {
  const navigate = useNavigate();
  const { state, dispatch } = useGlobalContext();

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
    <nav style={{ background: state.siteTheme === 'dark' ? 'darkblue' : 'aliceblue', color: state.siteTheme === 'dark' ? 'lightgray' : 'darkgray' }}>
      <h1>My Reading List</h1>
      <ul>
        <li>
          <NavLink
            className={({ isActive, isPending }) => (isActive ? 'active brand' : isPending ? 'pending brand' : 'brand')}
            style={{ color: state.siteTheme === 'dark' ? 'lightgray' : 'midnightblue' }}
            to='/'>
            Home
          </NavLink>
        </li>
        {!state.user ? (
          <>
            <li>
              <NavLink style={{ color: state.siteTheme === 'dark' ? 'lightgray' : 'midnightblue' }} to='/login'>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink style={{ color: state.siteTheme === 'dark' ? 'lightgray' : 'midnightblue' }} to='/signup'>
                Sign Up
              </NavLink>
            </li>
          </>
        ) : (
          <li onClick={handleLogout}>Logout</li>
        )}
      </ul>
      <ThemeSelector />
      <LanguageDropdown />
    </nav>
  );
}
