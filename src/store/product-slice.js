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
      state.products = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProductData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProductData.fulfilled, (state, action) => {
        const payloadCopy = action.payload;
        payloadCopy.forEach((product) => {
          product.display = true;
        });
        state.status = "succeeded";
        state.products = payloadCopy;
      })
      .addCase(fetchProductData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  }
});

export const fetchProductData = createAsyncThunk("products/fetchProductData", async (cat) => {
  if (cat === 'all') {
    const res = await fetch("https://fakestoreapi.com/products?limit=10")
    .then((res) => res.json())
    return res;
  }  else {
    const res = await fetch(`https://fakestoreapi.com/products/category/${cat}?limit=10`)
    .then((res)=> res.json())
    return res;
  }});

export const selectProducts = (state) => state.products;

export const { addProducts } = productSlice.actions;

export default productSlice.reducer;
