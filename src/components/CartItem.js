import React from "react";

export default function CartItem(props) {
  return (
    <li className="cart-item">
      <img className="cart-image" src={props.image}></img>
      <div className="cart-details">
        <div className="cart-title">{props.title}</div>
        <div className="cart-price">&#163;{props.price}</div>
        <div className="cart-quantity">Quantity&#58;&nbsp;{props.quantity}</div>
      </div>
    </li>
  );
}
