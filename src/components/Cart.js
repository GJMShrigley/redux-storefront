import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import "../cart.css";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const [cartItems, totalPrice, totalQuantity] = [
    cart.list,
    cart.totalPrice,
    cart.totalQuantity,
  ];
  const [display, setDisplay] = useState(false);
  let modal;
  let content = cartItems.map((item) => (
    <CartItem key={item.id} id={item.id} />
  ));

  function mouseHandler() {
    setDisplay(!display);
  }

  if (display) {
    modal = (
      <div className="cart-display">
        <div className="cart-item-list">
        {content}
        </div>
        <div className="cart-total">
          Total&#58;&nbsp;
          {totalPrice.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
          })}
        </div>
        <div className="cart-buttons-container">
          <Link to="/cart" className="cart-go-to button">
            GO TO CART
          </Link>
          <Link to="/confirmation" className="cart-submit button">
            CHECKOUT
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="cart"
      onMouseEnter={mouseHandler}
      onMouseLeave={mouseHandler}
    >
      <Link to="/cart" className="header-cart-btn">
        CART &#40;{totalQuantity}&#41;
      </Link>
      {modal}
    </div>
  );
}
