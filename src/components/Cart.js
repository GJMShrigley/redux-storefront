import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const [cartItems, totalPrice, totalQuantity] = [cart.list, cart.totalPrice, cart.totalQuantity] ;
  const [display, setDisplay] = useState(false);
  let modal;
  let content = cartItems.map((item) => (
    <CartItem
      key={item.id}
      id={item.id}
      image={item.image}
      price={item.price}
      title={item.title}
      quantity={item.quantity}
    />
  ));

  function mouseHandler() {
    setDisplay(!display);
  }

  if (display) {
    modal = <div className="cart-display">
        {content}
        <div className="cart-total">Total&#58;&nbsp;{totalPrice.toLocaleString("en-GB", {style: "currency", currency: "GBP", minimumFractionDigits: 2})}</div>
        <div className="cart-submit">GO TO CHECKOUT</div>
    </div>;
  }

  return (
    <div className="cart" onMouseEnter={mouseHandler} onMouseLeave={mouseHandler}>
      <div className="cart-btn">CART ({totalQuantity})</div>
      {modal}
    </div>
  );
}
