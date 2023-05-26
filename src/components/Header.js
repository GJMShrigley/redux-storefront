import React from "react";
import Cart from "./Cart";
import "../header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__title">FAKE</div>
      <Cart />
    </header>
  );
}

export default Header;
