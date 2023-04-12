import React from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";

export default function ProductList() {
  const products = useSelector(state => state.products.products);
  const productStatus = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);
  
  let content;

  if (productStatus === "loading") {
    content = <div className="product-item">LOADING</div>
  } else if (productStatus === "succeeded") {
    content = products.map(item => (
        <ProductItem
          key={item.id}
          description={item.description}
          id={item.id}
          image={item.image}
          price={item.price}
          rating={item.rating}
          title={item.title}
        />
    ))
  } else if (productStatus === "failed") {
    content = <div className="product-item">{error}</div>
  }

  return <ul className="product-list">{content}</ul>;
}
