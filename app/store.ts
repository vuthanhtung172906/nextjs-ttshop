import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import userReducer from '../features/auth/userSlice';
import categoryReducer from '../features/category/categorySlice';
import cartReducer from '../features/payment/cartSlice';
import productReducer from '../features/products/productSlice';
import rootSaga from './rootSaga';
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  product: productReducer,
  category: categoryReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

export const makeStore = () => {
  sagaMiddleware.run(rootSaga);
  return store;
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const wrapper = createWrapper(makeStore, { debug: true });
