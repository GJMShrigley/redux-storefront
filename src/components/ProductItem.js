import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice";

export default function ProductItem(props) {
  const dispatch = useDispatch();

  function addProductToCart() {
    dispatch(addToCart(props))
  }

  if (props.display) {
    return (
      <li className="product-item">
        {/* <div className="product-image-wrapper"> */}
        <img className="product-image" src={props.image}></img>
        {/* </div> */}
        <div className="product-details">
          <div className="product-title">{props.title}</div>
          <div className="product-rating">
            <div className="product-rating-score">{props.rating.rate}</div>
            <div className="product-rating-number">
              &#40;{props.rating.count}&#41;
            </div>
          </div>
          <div className="product-description">{props.description}</div>
        </div>
        <div className="product-options">
          <div className="product-price">&#163;{props.price}</div>
          <div className="product-add" onClick={addProductToCart}>ADD TO CART</div>
        </div>
      </li>
    );
  }
}

