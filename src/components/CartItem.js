import React from "react";
import { useDispatch } from "react-redux";
import {addToCart, removeFromCart } from "../store/cart-slice";

export default function CartItem(props) {
  const dispatch = useDispatch();

  function removeProductFromCart() {
    dispatch(removeFromCart(props))
  }

  function addProductToCart() {
    dispatch(addToCart(props))
  }

  return (
    <li className="cart-item">
      <img className="cart-item-image" src={props.image}></img>
      <div className="cart-item-details">
        <div className="cart-item-title">{props.title}</div>
        <div className="cart-item-price">{props.price.toLocaleString("en-GB", {style: "currency", currency: "GBP", minimumFractionDigits: 2})}</div>
        <div className="cart-item-quantity-container">
          <div className="cart-item-quantity">
            Quantity&#58;&nbsp;{props.quantity}
          </div>
          <div className="cart-item-remove" onClick={addProductToCart}>ADD</div>
          <div className="cart-item-remove" onClick={removeProductFromCart}>REMOVE</div>
        </div>
      </div>
    </li>
  );
}
