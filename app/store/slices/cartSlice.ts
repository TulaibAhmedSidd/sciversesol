// // store/slices/cartSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {},
//   reducers: {
//     addToCart: (state, action) => {
//       const { id } = action.payload;
//       if (state[id]) {
//         state[id].quantity += 1;
//       } else {
//         state[id] = { ...action.payload, quantity: 1 };
//       }
//     },
//     removeFromCart: (state, action) => {
//       const { id } = action.payload;
//       if (state[id]) {
//         if (state[id].quantity > 1) {
//           state[id].quantity -= 1;
//         } else {
//           delete state[id];
//         }
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Store cart items as an array
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.items.find(
        (item) => item._id === product._id
      );

      if (existingProduct) {
        // Increment quantity if product already exists
        existingProduct.quantity += 1;
      } else {
        // Add product to cart with initial quantity of 1
        const { ...productWithoutImage } = product; // Exclude image
        state.items.push({ ...productWithoutImage, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.items.find((item) => item._id === productId);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const productIndex = state.items.findIndex(
        (item) => item._id === productId
      );
      if (productIndex !== -1) {
        const product = state.items[productIndex];
        product.quantity -= 1;

        // Remove product if quantity is 0
        if (product.quantity <= 0) {
          state.items.splice(productIndex, 1);
        }
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item._id !== productId);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
