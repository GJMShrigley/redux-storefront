import "../App.css";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice";

function ProductPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { title, description, price, ratingScore, ratingCount, image, id } =
    location.state;
    console.log(location.state)

  function addProductToCart() {
    dispatch(addToCart(location.state));
  }

  return (
    <div className="product-page">
      <img className="product-page__item-image" src={image}></img>
      <div className="product-page__item-title">{title}</div>
      <div className="product-page__details">
        <div className="product-page__rating">
          <div className="product-page__rating-score">{ratingScore}</div>
          <div className="product-page__rating-number">
            &#40;{ratingCount}&#41;
          </div>
        </div>
        <div className="product-page__description">{description}</div>
      </div>
      <div className="product-page__options">
        <div className="product-page__price">
          {price.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
          })}
        </div>
      </div>
      <div className="product-page__add" onClick={addProductToCart}>
        ADD TO CART
      </div>
      ;
      <Link to="/" className="link-home">
        RETURN TO LISTINGS
      </Link>
    </div>
  );
}

export default ProductPage;
