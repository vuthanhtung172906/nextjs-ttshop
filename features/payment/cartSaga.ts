import { put, takeLatest } from '@redux-saga/core/effects';
import { cartAction } from './cartSlice';

function* getCartFromLocall() {
  const cartlist = JSON.parse(localStorage.getItem('cart') as string);
  if (cartlist) {
    yield put(
      cartAction.getSuccess({
        msg: 'Success',
        cartlist: cartlist,
      })
    );
  } else {
    yield put(
      cartAction.getSuccess({
        msg: 'Success',
        cartlist: [],
      })
    );
  }
}

export default function* cartSaga() {
  yield takeLatest(cartAction.getcart.toString(), getCartFromLocall);
}
