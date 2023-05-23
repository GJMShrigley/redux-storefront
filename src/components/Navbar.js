import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProducts, fetchProductData } from "../store/product-slice";
import "../navigation.css";

export default function Navbar() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState(products);
  const [searchType, setSearchType] = useState("title");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    const params = { category, sort };
    dispatch(fetchProductData(params));
  }, [dispatch, category, sort]);

  function changeCategory(e) {
    const target = e.target.innerHTML.toLowerCase();
    const string = target.toString();
    setCategory(string);
  }

  function changeSort(e) {
    const target = e.target.value.toLowerCase();
    const string = target.toString();
    setSort(string);
  }

  function changeSearchType(e) {
    const target = e.target.value.toLowerCase();
    const string = target.toString();
    let value;
    switch (string) {
      case "name":
        value = "title";
        break;
      case "description":
        value = "description";
        break;
      case "price":
        value = "price";
        break;
      case "rating":
        value = "rating.rate";
        break;
      default:
        value = "title";
        break;
    }
    setSearchType(value);
  }

  function setText(e) {
    setSearchText(e.target.value);
  }

  function search() {
    let inputText = searchText;
    const productsCopy = JSON.parse(JSON.stringify([...products]));
    let searchTypeValue = "";
    const searchTerm = new RegExp(inputText, "i");
    let result = "";

    if (isNaN(searchText) && searchType === "rating.rate") {
   
    } else if (!isNaN(searchText) && searchType === "rating.rate") {
      inputText = parseFloat(searchText);
      for (let i = 0; i < productsCopy.length; i++) {
        if (productsCopy[i].rating.rate === inputText) {
          productsCopy[i].display = true;
        } else {
          productsCopy[i].display = false;
        }
        setSearchResult(productsCopy);
      }
    } else {
      for (let i = 0; i < productsCopy.length; i++) {
        const currentProduct = productsCopy[i];
        searchTypeValue = currentProduct[searchType];
        result = searchTerm.test(searchTypeValue);
        if (result) {
          productsCopy[i].display = true;
        } else {
          productsCopy[i].display = false;
        }
        setSearchResult(productsCopy);
      }
    }
  }

  const handleKeyPress = useCallback((e) => {
    const searchButton = document.querySelector(".search-btn");
    if (e.key === "Enter") {
      searchButton.click();
    }
  }, []);

  useEffect(() => {
    dispatch(addProducts(searchResult));
  }, [dispatch, searchResult]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <nav className="navbar">
      <div className="navbar-search">
        <input className="search-input" onChange={setText}></input>
        <button className="search-btn button" onClick={search}>
          <Link to="/">SEARCH</Link>
        </button>
        <select className="search-dropdown" onChange={changeSearchType}>
            <option className="search-option">Title</option>
            <option className="search-option">Description</option>
            <option className="search-option">Rating</option>
        </select>
        <select className="sort-dropdown" onChange={changeSort}>
          <option className="sort-option">Asc</option>
          <option className="sort-option">Desc</option>
        </select>
      </div>
      <Link to="/">
        <ul className="navbar-list">
          <button className="navbar-item" onClick={changeCategory}>
            All
          </button>
          <button className="navbar-item" onClick={changeCategory}>
            Electronics
          </button>
          <button className="navbar-item" onClick={changeCategory}>
            Jewelery
          </button>
          <button className="navbar-item" onClick={changeCategory}>
            Men's Clothing
          </button>
          <button className="navbar-item" onClick={changeCategory}>
            Women's Clothing
          </button>
        </ul>
      </Link>
    </nav>
  );
}
