import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../store/cart-slice";

export default function CartItem(props) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart.list);
  const productId = props.id;
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
  }, [products, productId]);


  function removeProductFromCart(e) {
    e.preventDefault();
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        dispatch(removeFromCart(products[i]));
      }
    }
  }

  function addProductToCart(e) {
    e.preventDefault();
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        dispatch(addToCart(products[i]));
      }
    }
  }

  return (
    <Link
      to={`/product/${productId}`}
      className="cart-item"
      state={{
        id: productId,
      }}
      onClick={props.removeDisplay}
    >
      <div className="cart-item__image-wrapper">
        <img
          className="cart-item__image"
          src={selectedProduct.image}
          alt="a photograph of the product"
        ></img>
      </div>
      <div className="cart-item__details">
        <div className="cart-item__title">{selectedProduct.title}</div>
        <div className="cart-item__info-container">
        <div className="cart-item__price">
          {selectedProduct.price.toLocaleString("en-GB", {
            style: "currency",
            currency: "GBP",
            minimumFractionDigits: 2,
          })}
        </div>
          <div className="cart-item__quantity">
            Quantity&#58;&nbsp;{selectedProduct.quantity}
          </div>
          <div className="cart-item__buttons-container">
            <div
              className="cart-item__add button"
              onClick={addProductToCart}
            >
              ADD
            </div>
            <div
              className="cart-item__remove button"
              onClick={removeProductFromCart}
            >
              REMOVE
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
