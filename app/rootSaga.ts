import { all } from 'redux-saga/effects';
import userSaga from '../features/auth/userSaga';
import categorySaga from '../features/category/categorySaga';
import cartSaga from '../features/payment/cartSaga';
import productSaga from '../features/products/productSaga';
export default function* rootSaga() {
  yield all([userSaga(), cartSaga(), productSaga(), categorySaga()]);
}
