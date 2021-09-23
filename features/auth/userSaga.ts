import { call, put, takeLatest } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userApi from "../../api/axiosUser";
import { User, UserState } from "../../types";
import { userAction } from "./userSlice";
function* fetchCurrentUser(action: PayloadAction<User>) {
  try {
    console.log("In userSage fetchCurrentUser");
    const res: UserState = yield call(userApi.login, action.payload);
    yield put(userAction.getUserSucces(res));
    localStorage.setItem("login", "true");
    toast.success("Login Success");
  } catch (error) {
    toast.error("Email or Password incorrect");

    yield put(userAction.getUserFail());
  }
}
function* getAccessToken() {
  try {
    console.log("IN get AccessToken from refreshToken");
    const res: UserState = yield call(userApi.getRefreshToken);
    yield put(userAction.getAccessTokenSuccess(res));
  } catch (error) {
    yield put(userAction.logoutUser);
  }
}
function* logout() {
  try {
    console.log("Log out saga");
    localStorage.removeItem("login");
    yield call(userApi.logout);
  } catch (error) {
    throw error;
  }
}
export default function* userSaga() {
  yield takeLatest(userAction.getCurrentUser.type, fetchCurrentUser);
  yield takeLatest(
    userAction.getAccessTokenFromRefreshToken.type,
    getAccessToken
  );
  yield takeLatest(userAction.logoutUser.type, logout);
}
