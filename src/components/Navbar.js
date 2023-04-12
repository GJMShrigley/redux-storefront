import React, { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { fetchProductData } from "../store/product-slice";


export default function Navbar() {
  const [category, setCategory] = useState("all")
  const dispatch = useDispatch();
  
  useEffect(() => {
      dispatch(fetchProductData(category));
  }, [dispatch, category])

  function changeCategory(e) {
    const target = e.target.innerHTML.toLowerCase();
    const string = target.toString();
    setCategory(string)
  }

  return (
    <nav className="navbar">
      <div className="navbar-search">
        <input className="search-input"></input>
        <button className="search-btn">Go</button>
      </div>
      <ul className="navbar-list">
        <button className="navbar-item" onClick={changeCategory}>All</button>
        <button className="navbar-item" onClick={changeCategory}>Electronics</button>
        <button className="navbar-item" onClick={changeCategory}>Jewelery</button>
        <button className="navbar-item" onClick={changeCategory}>Men's Clothing</button>
        <button className="navbar-item" onClick={changeCategory}>Women's Clothing</button>
      </ul>
    </nav>
  );
};
