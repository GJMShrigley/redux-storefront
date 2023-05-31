import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../display.css";
import "../loadingPage.css";
import "../message.css";

export default function ProductList() {
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productsOnPage, setProductsOnPage] = useState([]);

  let content;

  useEffect(() => {
    //search through copy of products array for products with display set to true, update State
    let productsCopy = [];
    for (let i = 0; i < products.length; i++) {
      if (products[i].display === true) {
        productsCopy.push(products[i]);
      }
    }
    setSelectedProducts(productsCopy);
    setPage(1);
  }, [products]);

  useEffect(() => {
    //divide selectedProducts into pages based on productsPerPage value, update State
    const visibleProducts = selectedProducts.slice(
      page * productsPerPage - productsPerPage,
      page * productsPerPage
    );
    setProductsOnPage(visibleProducts);

    //generate page numbers
    const pageNav = document.querySelector(".page__nav");
    pageNav.textContent = "";
    for (let i = 0; i < selectedProducts.length / productsPerPage; i++) {
      const pageBtn = document.createElement("div");
      pageBtn.classList.add("page__btn");
      pageBtn.innerHTML = i + 1;
      pageBtn.onclick = selectPage;
      pageNav.appendChild(pageBtn);
    }
  }, [selectedProducts, page, productsPerPage]);

  //select page number
  function selectPage(e) {
    setPage(parseFloat(e.target.innerHTML));
  }

  //change number of products displayed on page
  function changeNumber(e) {
    setProductsPerPage(e.target.value);
  }

  //populate product list
  if (productStatus === "loading") {
    content = (
      <div className="loading-page">
        <div className="loading__indicator"></div>
      </div>
    );
  } else if (productStatus === "succeeded") {
    content = productsOnPage.map((item) => (
      <ProductItem key={item.id} id={item.id} />
    ));
  } else if (productStatus === "failed") {
    content = (
      <div className="error-page">
        <div className="error-page__container">
          <h1 className="error-page__title">AN ERROR HAS OCCURRED</h1>
          <h2 className="error-page__subtitle">{error}</h2>
          <Link to="/" className="link__home button">
            RETURN HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list__wrapper">
      <ul className="product-list">{content}</ul>
      <div className="page__buttons">
        <nav className="page__nav"></nav>
        <select className="page__dropdown" onChange={changeNumber}>
          <option className="page__quantity">5</option>
          <option className="page__quantity">10</option>
          <option className="page__quantity">15</option>
        </select>
      </div>
    </div>
  );
}
