import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";

export default function ProductList() {
  const products = useSelector(state => state.products.products);
  const productStatus = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  let content;

  //update products on page, dynamically generate page numbers
  useEffect(() => {
    const initialProducts = products.slice(((page * productsPerPage) - productsPerPage), (page * productsPerPage));
    const pageNav = document.querySelector(".page-nav");
    pageNav.textContent = "";
    setDisplayedProducts(initialProducts);

    for (let i = 0; i < (products.length / productsPerPage); i++) {
      const pageBtn = document.createElement("div");
      pageBtn.classList.add("page-btn")
      pageBtn.innerHTML = (i + 1);
      pageBtn.onclick = selectPage;
      pageNav.appendChild(pageBtn);
    }
  }, [products, productsPerPage])

  //select page number
  function selectPage(e) {
    const selectedPage = e.target.innerHTML;
    const productSelection = products.slice(((selectedPage * productsPerPage) - productsPerPage), (selectedPage * productsPerPage));
    setDisplayedProducts(productSelection);
  }

  //change number of products displayed on page
  function changeNumber(e) {
    setProductsPerPage(e.target.value);
  }

  //populate product list
  if (productStatus === "loading") {
    content = <div className="product-item">LOADING PRODUCTS</div>
  } else if (productStatus === "succeeded") {
    content = displayedProducts.map(item => (
        <ProductItem
          key={item.id}
          description={item.description}
          id={item.id}
          image={item.image}
          price={item.price}
          rating={item.rating}
          title={item.title}
          display={item.display}
        /> 
    ))
  } else if (productStatus === "failed") {
    content = <div className="product-item">{error}</div>
  }

  return <div>
    <ul className="product-list">{content}</ul>
    <div className="page-buttons">
    <nav className="page-nav"></nav>
    <select className="product-dropdown" onChange={changeNumber}>
      <option className="product-number">5</option>
      <option className="product-number">10</option>
      <option className="product-number">15</option>
    </select>
    </div>

    </div>;
}
