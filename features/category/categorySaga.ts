import { call, put, takeLatest } from '@redux-saga/core/effects';
import categoryApi from '../../api/axiosCategory';
import { ICategory } from './../../types/params';
import { categoryAction } from './categorySlice';

function* fetchCategoryList() {
  try {
    const respone: ICategory[] = yield call(categoryApi.get);
    console.log({ respone });
    yield put(categoryAction.getCategorySuccess(respone));
  } catch (error) {
    console.log('error in Saga');
    yield put(categoryAction.getCategoryFail());
  }
}

export default function* categorySaga() {
  yield takeLatest(categoryAction.getCategory.type, fetchCategoryList);
}
