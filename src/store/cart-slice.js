import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     list: [],
//     totalPrice: 0,
// };

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        list: [],
        totalPrice: 0
    },
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.list.find(
                (item) => item.id === newItem.id
              );
              if (existingItem) {
                existingItem.quantity++;
              } else {
                state.list.push({
                    key: newItem.id,
                    id: newItem.id,
                    price: newItem.price,
                    title: newItem.title,
                    image: newItem.image,
                    quantity: 1
                });
              }
    
            state.totalPrice += newItem.price
        }
    }
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;