import React, { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">  Dzyris Infotech</div>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
        <li><a href="RoomReport">Report</a></li>
          {/* <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#contact">Contact</a></li> */}
          
        </ul>
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
};

export default Navbar;