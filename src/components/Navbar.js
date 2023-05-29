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

  // fetch a product list from the fakestore API according to the selected parameters (category, and sort order)
  useEffect(() => {
    const params = { category, sort };
    dispatch(fetchProductData(params));
  }, [dispatch, category, sort]);

  // update the local 'category' State according to the selected navbar element
  function changeCategory(e) {
    const target = e.target.innerHTML.toLowerCase();
    const string = target.toString();
    setCategory(string);
  }

  // update the local 'sort' State according to the selected option in the dropdown menu
  function changeSort(e) {
    const target = e.target.value.toLowerCase();
    const string = target.toString();
    setSort(string);
  }

  // update the local 'search type' State according to the selected option in the dropdown menu
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

  // update the 'searchText' State with the contents of the input field
  function setText(e) {
    setSearchText(e.target.value);
  }

  function search() {
    // create copies of 'searchText', and 'products'. Create new Variables, and Regex based on the new input field text
    let inputText = searchText;
    const productsCopy = JSON.parse(JSON.stringify([...products]));
    let searchTypeValue = "";
    const searchTerm = new RegExp(inputText, "i");
    let result = "";

    // carry out a search of the productsCopy Variable based on the value of the input field, and the search type selected
    if (isNaN(searchText) && searchType === "rating.rate") {
      //Do nothing
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
        result = searchTerm.test(searchTypeValue); // test the current product in the loop against the Regex
        if (result) {
          // if the current product in the loop contains the Regex in the selected property, set it to display, otherwise remove it from the list of elements
          productsCopy[i].display = true;
        } else {
          productsCopy[i].display = false;
        }
        setSearchResult(productsCopy);
      }
    }
  }

  // trigger a 'click' on the navbar search button when the 'handleKeyPress' Function is called
  const handleKeyPress = useCallback((e) => {
    const searchButton = document.querySelector(".navbar__btn");
    if (e.key === "Enter") {
      searchButton.click();
    }
  }, []);

  // update the global 'products' State with the list of updated products resulting from a search
  useEffect(() => {
    dispatch(addProducts(searchResult));
  }, [dispatch, searchResult]);

  // add a listener for the 'keydown' event
  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
  });

  return (
    <nav className="navbar">
      <div className="navbar__search">
        <input className="navbar__input" onChange={setText}></input>
        <button className="navbar__btn button" onClick={search}>
          <Link to="/">SEARCH</Link>
        </button>
        <select className="navbar__search-dropdown" onChange={changeSearchType}>
          <option className="navbar__search-option">Title</option>
          <option className="navbar__search-option">Description</option>
          <option className="navbar__search-option">Rating</option>
        </select>
        <select className="navbar__sort-dropdown" onChange={changeSort}>
          <option className="navbar__sort-option">Asc</option>
          <option className="navbar__sort-option">Desc</option>
        </select>
      </div>
      <Link className="link__home" to="/">
        <ul className="navbar__list">
          <button className="navbar__item" onClick={changeCategory}>
            All
          </button>
          <button className="navbar__item" onClick={changeCategory}>
            Electronics
          </button>
          <button className="navbar__item" onClick={changeCategory}>
            Jewelery
          </button>
          <button className="navbar__item" onClick={changeCategory}>
            Men's Clothing
          </button>
          <button className="navbar__item" onClick={changeCategory}>
            Women's Clothing
          </button>
        </ul>
      </Link>
    </nav>
  );
}
