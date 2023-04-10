import React, { useEffect } from "react";
import ProductItem from "./ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData, selectProducts } from "../store/product-slice";

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const productStatus = useSelector(state => state.products.status);
  const error = useSelector(state => state.products.error);
  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProductData());
    }
  }, [productStatus, dispatch]);
  
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
