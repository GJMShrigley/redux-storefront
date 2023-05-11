import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const [cartItems, totalPrice, totalQuantity] = [
    cart.list,
    cart.totalPrice,
    cart.totalQuantity,
  ];

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

  let cartList = (
    <div className="cart-page__display">
      {content}
      <div className="cart-total">
        Total&#58;&nbsp;
        {totalPrice.toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
          minimumFractionDigits: 2,
        })}
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      {cartList}
      <Link to="/" className="link-home">
        RETURN HOME
      </Link>
      <Link to="/confirmation" className="cart-submit">
          GO TO CHECKOUT
        </Link>
    </div>
  );
}

export default CartPage;
