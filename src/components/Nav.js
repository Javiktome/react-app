import React from 'react';
import {Link} from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li style={{cursor: 'pointer'}}>
          <Link to="/">Home</Link>
        </li>
        <li style={{cursor: 'pointer'}}>
          {' '}
          <Link to="/profile">Profile</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
