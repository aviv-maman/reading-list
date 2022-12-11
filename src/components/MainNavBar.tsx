import React from 'react';
import { Link } from 'react-router-dom';

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
        <li>Logout</li>
      </ul>
    </nav>
  );
}
