import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice";
import "../productPage.css";

function ProductPage() {
  const location = useLocation();
  const productId = location.state.id;
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [selectedProduct, setSelectedProduct] = useState({
    price: 0,
    image: "",
    rating: { rate: 0, count: 0 },
    description: "",
    title: "",
  });

  useEffect(() => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        setSelectedProduct(products[i]);
      }
    }
  }, [products, location, productId]);

  function addProductToCart() {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        dispatch(addToCart(products[i]));
      }
    }
  }
  
  return (
    <div className="product-page">
      <img
        className="product-page__item-image"
        src={selectedProduct.image}
        alt="a photograph of the product"
      ></img>
      <div className="product-page__details">
        <div className="product-page__item-title">{selectedProduct.title}</div>
        <div className="product-page__rating">
          <div className="product-page__rating-score">
            {selectedProduct.rating.rate}
          </div>
          <div className="product-page__rating-number">
            &#40;{selectedProduct.rating.count}&#41;
          </div>
        </div>
        <div className="product-page__description">
          {selectedProduct.description}
        </div>
        <div className="product-page__options">
        <div className="product-page__price">
          {selectedProduct.price.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
          })}
        </div>
        <div className="product-page__add button" onClick={addProductToCart}>
          ADD TO CART
        </div>
      </div>
      </div>

      <Link to="/" className="link-home button">
        RETURN TO LISTINGS
      </Link>
    </div>
  );
}

export default ProductPage;
