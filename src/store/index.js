import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import productSlice from "./product-slice";
import cartSlice from "./cart-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    products: productSlice.reducer,
    cart: cartSlice.reducer
  },
});

export default store;