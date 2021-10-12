import { IProductParams } from './../../types/params';
import { IProductResponse } from './../../types/product';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
const hydrate = createAction(HYDRATE);
interface ProductListState extends IProductResponse {
  loading: boolean;
  filter: IProductParams;
}
const initialState: ProductListState = {
  loading: false,
  products: [],
  pagination: {
    _page: 1,
    _limit: 15,
    _totalCount: 15,
  },
  filter: {
    page: 1,
    limit: 10,
  },
};
const productSlide = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    getProductList: (state, action: PayloadAction<IProductParams>) => {
      state.loading = true;
    },
    getProductSuccess: (state, action: PayloadAction<IProductResponse>) => {
      state.products = action.payload.products;
      state.pagination = action.payload.pagination;
    },
    getProductFail: (state) => {
      state.loading = false;
    },
    setFilter: (state, action: PayloadAction<IProductParams>) => {
      state.filter = action.payload;
    },
    setFilterDebounce: (state, action: PayloadAction<IProductParams>) => {},
  },
  extraReducers(builder) {
    builder.addCase(hydrate, (state) => {
      return {
        ...state,
      };
    });
  },
});

const productReducer = productSlide.reducer;
export const productAction = productSlide.actions;

export default productReducer;
