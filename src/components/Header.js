import React from "react";
import Cart from "./Cart";
import "../header.css";

function Header(props) {
  const isLoggedIn = props.isLoggedIn;

  //render the Header buttons if the 'isLoggedIn' State is true
  return (
    <header className="header">
      <div className="header__title">FAKE</div>
      {isLoggedIn ? <div className="header__buttons">
        <div className="header__logout-btn button" onClick={props.logoutHandler} >LOGOUT</div>
        <Cart />
      </div> : <></>}
    </header>
  );
}

export default Header;
