import { IProductResponse } from './../../types/product';
import { IProductParams } from './../../types/params';
import { PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, put, call, debounce } from '@redux-saga/core/effects';
import productApi from '../../api/axiosProduct';
import { productAction } from './productSlice';

function* fetchProductList(action: PayloadAction<IProductParams>) {
  try {
    const response: IProductResponse = yield call(productApi.getProduct, action.payload);
    yield put(productAction.getProductSuccess(response));
  } catch (error) {
    yield put(productAction.getProductFail());
  }
}
function* setFilterDebounce(action: PayloadAction<IProductParams>) {
  console.log('Debounce');
  yield put(productAction.setFilter(action.payload));
}
export default function* productSaga() {
  yield takeLatest(productAction.getProductList.type, fetchProductList);
  yield debounce(500, productAction.setFilterDebounce.type, setFilterDebounce);
}
