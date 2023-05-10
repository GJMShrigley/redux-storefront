import "../App.css";
import React from "react";
import { Link } from "react-router-dom";

function CartPage() {
  return (
    <div>
      <div className="cart-page">CART PAGE PLACEHOLDER</div>
      <Link to="/" className="link-home">
        RETURN HOME
      </Link>
    </div>
  );
}

export default CartPage;
