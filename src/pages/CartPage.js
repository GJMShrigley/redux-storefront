import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartPageItem from "../components/CartPageItem";
import "../cart.css"

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const [cartItems, totalPrice] = [
    cart.list,
    cart.totalPrice,
  ];

  let content = cartItems.map((item) => (
    <CartPageItem
      key={item.id}
      id={item.id}
    />
  ));

  let cartList = (
    <div className="cart-page__list">
      {content}
      <div className="cart-page-total">
        Total&#58;&nbsp;
        {totalPrice.toLocaleString("en-GB", {
          style: "currency",
          currency: "GBP",
          minimumFractionDigits: 2,
        })}
      </div>
      <div className="cart-page-buttons-container">
      <Link to="/" className="link-home button">
        RETURN HOME
      </Link>
      <Link to="/confirmation" className="cart-submit button">
          GO TO CHECKOUT
        </Link>
        </div>
    </div>
  );

  return (
    <div className="cart-page">
      {cartList}
    </div>
  );
}

export default CartPage;
