import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";

export default function Cart() {
  const cart = useSelector((state) => state.cart.list);
  const totalPrice = useSelector((state) => state.cart.totalPrice)
  const [display, setDisplay] = useState(false);
  let modal;
  let content = cart.map((item) => (
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
    console.log(cart)
  }

  if (display) {
    modal = <div className="cart-display">
        {content}
        <div className="cart-total">Total&#58;&nbsp;&#163;{totalPrice}</div>
    </div>;
  }

  return (
    <div className="cart" onMouseEnter={mouseHandler} onMouseLeave={mouseHandler}>
      <div className="cart-btn">CART ({cart.length})</div>
      {modal}
    </div>
  );
}
