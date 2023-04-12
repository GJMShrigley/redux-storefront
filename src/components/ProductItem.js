import React from "react";

function ProductItem(props) {
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
          <div className="product-rating-number">&#40;{props.rating.count}&#41;</div>
        </div>
        <div className="product-description">{props.description}</div>
      </div>
      <div className="product-price"></div>
    </li>
  );
}
}

export default ProductItem;
