import { IProduct } from './../../types/product';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
const hydrate = createAction(HYDRATE);
interface CartList {
  msg: string;
  cartlist: IProduct[];
}
const initialvalue: CartList = {
  msg: 'Idle',
  cartlist: [],
};
const cartSlide = createSlice({
  name: 'cart',
  initialState: initialvalue,
  reducers: {
    addcart: (state, action: PayloadAction<IProduct>) => {
      state.cartlist.push(action.payload);
    },
    deletecart: (state, action: PayloadAction<number>) => {
      state.cartlist.splice(action.payload, 1);
    },
    getcart: (state) => {
      state.msg = 'Loading';
    },
    getSuccess: (state, action: PayloadAction<CartList>) => {
      state.msg = action.payload.msg;
      state.cartlist = action.payload.cartlist;
    },
    increment: (state, action: PayloadAction<number>) => {
      const product = state.cartlist[action.payload];
      const newproduct: IProduct = {
        ...product,
        quantity: (product.quantity as number) + 1,
      };
      state.cartlist[action.payload] = newproduct;
    },
    descrement: (state, action: PayloadAction<number>) => {
      const product = state.cartlist[action.payload];
      if (product.quantity !== 1) {
        const newproduct: IProduct = {
          ...product,
          quantity: (product.quantity as number) - 1,
        };
        state.cartlist[action.payload] = newproduct;
      }
    },
    clearCart: (state) => {
      state.cartlist = {
        ...initialvalue.cartlist,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state) => {
      return {
        ...state,
      };
    });
  },
});

const cartReducer = cartSlide.reducer;
export const cartAction = cartSlide.actions;
export default cartReducer;
