import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

const initialState = {
  cart: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    removeItem(state, action) {
      console.log(action.payload);
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItem(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      console.log(item.quantity);
      if (item.quantity <= 0) {
        state.cart = state.cart.filter(
          (item) => item.pizzaId !== action.payload
        );
      } else {
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
});

export const { addItem, removeItem, increaseItem, decreaseItem, clearCart } =
  cartSlice.actions;
export default cartSlice;

export const getToatalQuantiy = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);
export const getTotalPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCurretOrdered = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId == id)?.quantity ?? 0;
