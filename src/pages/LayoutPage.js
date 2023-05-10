import "../App.css";
import React from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import Navbar from "../components/Navbar";

function LayoutPage() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default LayoutPage;