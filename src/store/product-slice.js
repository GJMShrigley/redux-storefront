import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      // receive an updated list of products
      state.products = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductData.pending, (state, action) => {
        state.status = "loading"; // update the 'status' property of the 'products' State based on the 'fetchProductData' Thunk
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        const payloadCopy = action.payload;
        payloadCopy.forEach((product) => {
          // assign a 'display' property to each individual product in the 'products' State
          product.display = true;
        });
        state.status = "succeeded"; // update the 'status' property of the 'products' State based on the 'fetchProductData' Thunk
        state.products = payloadCopy; // update the list of products in the 'products' State with the results of the API call
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = "failed"; // update the 'status' property of the 'products' State based on the 'fetchProductData' Thunk
        state.error = action.error.message; // update the 'error' property of the 'products' State with an error message for display
      });
  },
});

export const fetchProductData = createAsyncThunk(
  "products/fetchProductData",
  async (params) => {
    const request = "https://fakestoreapi.com/products";
    const { category, sort } = params;

    // combine the 'request' Variable with the parameters provided by the user's selections in the navbar component
    if (category === "all") {
      const res = await fetch(`${request}?sort=${sort}`).then((res) =>
        res.json()
      );
      return res;
    } else {
      const res = await fetch(
        `${request}/category/${category}?sort=${sort}`
      ).then((res) => res.json());
      return res;
    }
  }
);

export const selectProducts = (state) => state.products;

export const { addProducts } = productSlice.actions;

export default productSlice;
