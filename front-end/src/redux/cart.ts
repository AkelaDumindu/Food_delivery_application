import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  unitPrice: number;
}

interface CartItem extends Product {
  qty: number;
  total: number;
}

interface CartState {
  cartItem: CartItem[];
}

const initialState: CartState = {
  cartItem: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<Product>) => {
      const check = state.cartItem.some(el => el._id === action.payload._id);
      if (check) {
        toast.error('Item already in cart');
      } else {
        const total = action.payload.unitPrice;
        state.cartItem.push({ ...action.payload, qty: 1, total });
        toast.success('Item added to cart successfully');
      }
    },
    removeCartItem: (state, action: PayloadAction<string>) => {
      state.cartItem = state.cartItem.filter(el => el._id !== action.payload);
      toast.success('Item removed from cart');
    },
    updateCartItem: (
      state,
      action: PayloadAction<{ _id: string; qty: number }>
    ) => {
      const item = state.cartItem.find(el => el._id === action.payload._id);
      if (item) {
        item.qty = action.payload.qty;
        item.total = item.unitPrice * item.qty;
        toast.success('Cart updated successfully');
      }
    },
  },
});

export const { addCartItem, removeCartItem, updateCartItem } = cartSlice.actions;
export default cartSlice.reducer;
