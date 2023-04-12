import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProducts, fetchProductData } from "../store/product-slice";


export default function Navbar() {
  const [category, setCategory] = useState("all");

  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const [searchResult, setSearchResult] = useState(products)
  
  useEffect(() => {
      dispatch(fetchProductData(category));
  }, [dispatch, category])

  function changeCategory(e) {
    const target = e.target.innerHTML.toLowerCase();
    const string = target.toString();
    setCategory(string)
  }

  function searchText(e) {
    const inputText = e.target.value;
    const productsCopy = JSON.parse(JSON.stringify([...products]));
    let title = "";
    const searchTerm = new RegExp(inputText, 'i');
    let result = "";

    for (let i = 0; i < productsCopy.length; i++) {
      title = productsCopy[i].title;
      result = searchTerm.test(title);
      if (result) {
        productsCopy[i].display = true;
      } else {
        productsCopy[i].display = false;
      }
      setSearchResult(productsCopy);
    }
  }

  useEffect(() => {
    dispatch(addProducts(searchResult));
  }, [dispatch, searchResult])
  

  return (
    <nav className="navbar">
      <div className="navbar-search">
        <input className="search-input" onChange={searchText}></input>
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
