import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cart-slice";

export default function ProductItem(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productId = props.id;
  const [selectedProduct, setSelectedProduct] = useState({});
  
  useEffect(() => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        setSelectedProduct(products[i]);
      }
    }
  }, [products, productId])

  function addProductToCart(e) {
    e.preventDefault();
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        dispatch(addToCart(products[i]))
      }
    }
  }
  
  if (selectedProduct.display) {
    return (
      <Link
        to={`/product/${productId}`}
        className="product-item"
        state={{
          id: selectedProduct.id,
        }}
      >
        <div className="product-image-wrapper">
          <img className="product-image" src={selectedProduct.image} alt="a photograph of the product"></img>
        </div>
        <div className="product-details">
          <div className="product-title">{selectedProduct.title}</div>
          <div className="product-rating">
            <div className="product-rating-score">{selectedProduct.rating.rate}</div>
            <div className="product-rating-number">
              &#40;{selectedProduct.rating.count}&#41;
            </div>
          </div>
          <div className="product-description">{selectedProduct.description}</div>
        </div>
        <div className="product-options">
          <div className="product-price">
            {selectedProduct.price.toLocaleString("en-GB", {
              style: "currency",
              currency: "GBP",
              minimumFractionDigits: 2,
            })}
          </div>
          <div className="product-add" onClick={addProductToCart}>
            ADD TO CART
          </div>
        </div>
      </Link>
    );
  }
}
