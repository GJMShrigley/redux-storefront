import { configureStore } from "@reduxjs/toolkit";
import addProducts from "./product-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    products: addProducts,
    cart: cartSlice.reducer
  },
});

export default store;