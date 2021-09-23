import { all } from "redux-saga/effects";
import userSaga from "../features/auth/userSaga";
export default function* rootSaga() {
  yield all([userSaga()]);
}
