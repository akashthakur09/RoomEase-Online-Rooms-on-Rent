import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/navbar.css';

function Navbar({ toggleLoginWindow }) {
//   const [responsive, setResponsive] = useState(false);
  const location = useLocation();
  const [fixedNavbar, setFixedNavbar] = useState(false);

  const logout =()=>{
    window.localStorage.clear();
  }


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setFixedNavbar(true);
      } else {
        setFixedNavbar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`nav${fixedNavbar ? 'nav-fixed' : ''}`}>
      <Link to="#" className="nav-logo">RoomEase</Link>
      <ul className="nav-list" >
        <li><Link to="/updateRoom" className={location.pathname === '/updateRoom' ? 'active' : ''}>Update Rooms Details</Link></li>
        <li><Link to="/roomRequests" className={location.pathname === '/roomRequests' ? 'active' : ''}>Room Requests</Link></li>
      </ul>
      <div>
        <button className='nav-signin'  ><Link to="/landlordProfile" className='btn'>Profile</Link></button>
        <button className='nav-signup'  ><Link to="/" className='btn' onClick={logout}>Logout</Link></button>
      </div>
    </nav>
  );
}

export default Navbar;
