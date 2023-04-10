import { configureStore } from "@reduxjs/toolkit";
import addProducts from "./product-slice";

export default configureStore({
  reducer: {
    products: addProducts,
  },
});
