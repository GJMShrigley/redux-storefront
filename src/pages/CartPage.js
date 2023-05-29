import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartPageItem from "../components/CartPageItem";
import "../cart.css";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const [cartItems, totalPrice] = [cart.list, cart.totalPrice];

  //populate the cart with any items contained in the global 'cart' State
  let content = cartItems.map((item) => (
    <CartPageItem key={item.id} id={item.id} />
  ));

  return (
    <div className="cart-page">
      <div className="cart-page__list">
        {content}
        <div className="cart-page__total">
          Total&#58;&nbsp;
          {totalPrice.toLocaleString("en-GB", {
            //convert 'totalPrice' into currency
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
          })}
        </div>
        <div className="cart-page__buttons-container">
          <Link to="/" className="link__home button">
            RETURN HOME
          </Link>
          <Link to="/confirmation" className="link__submit button">
            GO TO CHECKOUT
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
