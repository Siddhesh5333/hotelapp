import React from 'react';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <a href="#">Hotel Rooms</a>
      </div>
     
      <div className="navbar-toggler">
        <button className="toggler-btn">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;