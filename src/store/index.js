import { configureStore } from "@reduxjs/toolkit";
import addProducts from "./product-slice";
import addToCart from "./cart-slice";

const store = configureStore({
  reducer: {
    products: addProducts,
    cart: addToCart
  },
});

export default store;