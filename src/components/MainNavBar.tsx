import { Link } from 'react-router-dom';
import { createApiClient } from '../api/api';

//API calls
const api = createApiClient();

export default function MainNavBar() {
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
        <li onClick={api.logOut}>Logout</li>
      </ul>
    </nav>
  );
}
