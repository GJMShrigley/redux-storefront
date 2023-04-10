import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  products: {},
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.products.push(action.payload);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductData.pending, (state, action) => {
        state.products.status = "loading";
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchProductData = createAsyncThunk("products/fetchProductData", async () => {
    const res = await fetch("https://fakestoreapi.com/products?limit=10")
      .then((res) => res.json())
      .then((json) => json);
      return res;
  }
);

export const selectProducts = (state) => state.products.products;

export const { addProducts } = productSlice.actions;

export default productSlice.reducer;
