import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        list: [],
        totalPrice: 0,
        totalQuantity: 0
    },
    reducers: {
        addToCart(state, action) {
          console.log(action.payload)
            const newItem = action.payload;
            const price = Math.round(newItem.price * 100) / 100;
            const existingItem = state.list.find(
                (item) => item.id === newItem.id
              );
              if (existingItem) {
                existingItem.quantity++;
                state.totalQuantity++;
              } else {
                state.list.push({
                    key: newItem.id,
                    id: newItem.id,
                    price: newItem.price,
                    title: newItem.title,
                    image: newItem.image,
                    ratingScore: newItem.ratingScore,
                    ratingCount: newItem.ratingCount,
                    quantity: 1
                });
                state.totalQuantity++;
              }
            state.totalPrice += price;
        },
        removeFromCart(state, action) {
          const selectedItem = action.payload;
          const price = Math.round(selectedItem.price * 100) / 100;
          const existingItem = state.list.find(
            (item) => item.id === selectedItem.id
          ); 
          if (existingItem.quantity > 1) {
            existingItem.quantity--;
            state.totalQuantity--;
          } else if (existingItem.quantity <= 1) {
            state.list = state.list.filter((item) => item.id !== selectedItem.id);
            state.totalQuantity--;
          }
          state.totalPrice = Math.round((state.totalPrice -= price) * 100) / 100;
        }
    }
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice;