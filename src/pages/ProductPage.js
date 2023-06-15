import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/cart-slice";
import "../productPage.css";

function ProductPage() {
  const params = useParams();
  const productId = parseInt(params.id);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [selectedProduct, setSelectedProduct] = useState({
    price: 0,
    image: "",
    rating: { rate: 0, count: 0 },
    description: "",
    title: "",
  });

  // loop through the list of products, retrieve information on the selected product, and set it to local State
  useEffect(() => {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        setSelectedProduct(products[i]);
      }
    }
  }, [products, params, productId]);

  // update the global 'cart' State to add the current product
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
             //convert 'price' into currency
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

      <Link to="/" className="link__home button">
        RETURN TO LISTINGS
      </Link>
    </div>
  );
}

export default ProductPage;
