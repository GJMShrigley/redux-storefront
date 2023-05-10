import "../App.css";
import React from "react";
import { useSelector } from "react-redux";
import Login from "../components/Login";
import ProductList from "../components/ProductList";

function ShopPage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="display">
      {!isLoggedIn && <Login />}
      {isLoggedIn && <ProductList />}
    </div>
  );
}

export default ShopPage;