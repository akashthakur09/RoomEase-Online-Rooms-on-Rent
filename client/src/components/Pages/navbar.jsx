
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/navbar.css';

function Navbar({ toggleLoginWindow }) {
  const location = useLocation();

  const logout = () => {
    window.localStorage.clear();
  }

  return (
    <nav className="nav">
      <Link to="#" className="nav-logo">RoomEase</Link>
      <ul className="nav-list">
        <li><Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link></li>
        <li><Link to="/search" className={location.pathname === '/search' ? 'active' : ''}>Explore Rooms</Link></li>
      </ul>
      <div>
        <button className='nav-signin'><Link to="/tenantProfile" className='btn'>Profile</Link></button>
        <button className='nav-signup'><Link to="/" className='btn' onClick={logout}>Logout</Link></button>
      </div>
    </nav>
  );
}

export default Navbar;
