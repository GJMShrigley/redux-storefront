import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-search">
        <input className="search-input"></input>
        <button className="search-btn">Go</button>
      </div>
      <ul className="navbar-list">
        <button className="navbar-item">All</button>
        <button className="navbar-item">Electronics</button>
        <button className="navbar-item">Jewelery</button>
        <button className="navbar-item">Men's Clothing</button>
        <button className="navbar-item">Women's Clothing</button>
      </ul>
    </nav>
  );
}

export default Navbar;
