import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import Login from "../components/Login";

function LayoutPage() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="App">
      <Header />
      <Navbar />
      {!isLoggedIn && <Login />}
      {isLoggedIn && <Outlet />}
    </div>
  );
}

export default LayoutPage;
