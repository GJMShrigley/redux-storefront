import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    list: [],
    totalPrice: 0,
    totalQuantity: 0,
  },
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const price = Math.round(newItem.price * 100) / 100; // ensure the 'price' property is correctly formatted
      const existingItem = state.list.find(
        // search the current list of items for the selected item
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        // if the item is already in the cart, increase its quantity
        existingItem.quantity++;
        state.totalQuantity++;
      } else {
        // if the item is not in the cart already, add it
        state.list.push({
          key: newItem.id,
          id: newItem.id,
          price: newItem.price,
          title: newItem.title,
          image: newItem.image,
          ratingScore: newItem.ratingScore,
          ratingCount: newItem.ratingCount,
          quantity: 1,
        });
        state.totalQuantity++;
      }
      state.totalPrice += price; // increase the 'totalPrice' property of the cart
    },
    removeFromCart(state, action) {
      const selectedItem = action.payload;
      const price = Math.round(selectedItem.price * 100) / 100;
      const existingItem = state.list.find(
        // search the current list of items for the selected item
        (item) => item.id === selectedItem.id
      );
      if (existingItem.quantity > 1) { // if the cart contains more than 1 of the selected item, reduce the quantity by 1
        existingItem.quantity--;
        state.totalQuantity--;
      } else if (existingItem.quantity <= 1) { // if the cart contains only 1 (or fewer) of the selected item, remove it from the cart entirely
        state.list = state.list.filter((item) => item.id !== selectedItem.id);
        state.totalQuantity--;
      }
      state.totalPrice = Math.round((state.totalPrice -= price) * 100) / 100; // recalculate the cart's 'totalPrice' according to the number of items now in the cart
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice;
