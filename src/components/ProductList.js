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

  useEffect(() => {
    const initialProducts = products.slice(((page * productsPerPage) - productsPerPage), (page * productsPerPage));
    setDisplayedProducts(initialProducts);
    const pageNav = document.querySelector(".page-nav");
    pageNav.textContent = "";

    for (let i = 0; i < (products.length / productsPerPage); i++) {
      
      const pageBtn = document.createElement("div");
      pageBtn.classList.add("page-btn")
      pageBtn.innerHTML = (i + 1);
      pageBtn.onclick = selectPage;
      pageNav.appendChild(pageBtn);
    }

  }, [products])

  function selectPage(e) {
    const selectedPage = e.target.innerHTML;
    const productSelection = products.slice(((selectedPage * productsPerPage) - productsPerPage), (selectedPage * productsPerPage));
    setDisplayedProducts(productSelection);
  }
  
  let content;

  if (productStatus === "loading") {
    content = <div className="product-item">LOADING</div>
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
    <nav className="page-nav">
    </nav>
    </div>;
}
