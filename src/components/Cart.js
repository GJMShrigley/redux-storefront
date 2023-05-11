import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";

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
    <CartItem
      key={item.id}
      id={item.id}
      image={item.image}
      price={item.price}
      title={item.title}
      ratingScore={item.ratingScore}
      ratingCount={item.ratingCount}
      quantity={item.quantity}
    />
  ));

  function mouseHandler() {
    setDisplay(!display);
  }

  if (display) {
    modal = (
      <div className="cart-display">
        {content}
        <div className="cart-total">
          Total&#58;&nbsp;
          {totalPrice.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
          })}
        </div>
        <Link to="/confirmation" className="cart-submit">
          GO TO CHECKOUT
        </Link>
      </div>
    );
  }

  return (
    <div
      className="cart"
      onMouseEnter={mouseHandler}
      onMouseLeave={mouseHandler}
    >
      <Link to="/cart" className="cart-btn">
        CART &#40;{totalQuantity}&#41;
      </Link>
      {modal}
    </div>
  );
}
