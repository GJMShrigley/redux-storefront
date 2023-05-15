import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../store/cart-slice";

export default function CartItem(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productId = props.id;
  

  function removeProductFromCart() {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        dispatch(removeFromCart(products[i]))
      }
    }
  }

  function addProductToCart() {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        dispatch(addToCart(products[i]))
      }
    }
  }

  return (
    <Link
    to={`/product/${productId}`}
        className="cart-item"
        state={{
          id: productId,
        }}
      >
      <img className="cart-item-image" src={props.image} alt="a photograph of the product"></img>
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
      </Link>
  );
}
