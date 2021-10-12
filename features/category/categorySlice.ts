import { RootState } from './../../app/store';
import { ICategory } from './../../types/params';
import { createSlice, createAction, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
const hydrate = createAction(HYDRATE);
interface categoryState {
  loading: boolean;
  categorylist: ICategory[];
}
const initialState: categoryState = {
  loading: false,
  categorylist: [],
};
const categorySlice = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {
    getCategory: (state) => {
      state.loading = true;
    },
    getCategorySuccess: (state, action: PayloadAction<ICategory[]>) => {
      state.loading = false;
      state.categorylist = action.payload;
    },
    getCategoryFail: (state) => {
      state.loading = false;
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

export const categoryAction = categorySlice.actions;
export const selectCategoryList = (state: RootState) => state.category.categorylist;
const categoryReducer = categorySlice.reducer;
export const selectFormCategory = createSelector(selectCategoryList, (categorylist) =>
  categorylist.map((city) => {
    return {
      label: city.name,
      value: city._id,
    };
  })
);
export default categoryReducer;
