import "./App.css";
import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
  
function App() {
  return (
    <div className="App">
      <Header />
      <Navbar />
      <ProductList />
    </div>
  );
}

export default App;
