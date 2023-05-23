import React from "react";
import Cart from "./Cart";
import "../header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-title">FAKE STORE API</div>
      <Cart />
    </header>
  );
}

export default Header;
