import "./App.css";
import React from "react";
import { useSelector } from "react-redux";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import ProductList from "./components/ProductList";

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="App">
      <Header />
      <Navbar />
      {!isLoggedIn && <Login />}
      {isLoggedIn && <ProductList />}
    </div>
  );
}

export default App;
