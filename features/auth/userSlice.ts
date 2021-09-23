import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { User, UserState } from "../../types";
const hydrate = createAction(HYDRATE);
const initialState: UserState = {
  msg: "Idle",
  access_token: "",
  user: {},
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getCurrentUser: (state, action: PayloadAction<User>) => {
      state.msg = "loading";
    },
    getUserSucces: (state, action: PayloadAction<UserState>) => {
      state.msg = action.payload.msg;
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.isLogin = true;
    },
    getUserFail: (state) => {
      state.msg = "False";
      state.isLogin = false;
    },
    logoutUser: (state) => {
      state.msg = "Idle";
      state.access_token = "";
      state.isLogin = false;
      state.user = {};
    },
    getAccessTokenFromRefreshToken: (state) => {
      state.msg = "loading";
    },
    getAccessTokenSuccess: (state, action: PayloadAction<UserState>) => {
      state.msg = action.payload.msg;
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.isLogin = true;
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

const userReducer = userSlice.reducer;
export default userReducer;
export const userAction = userSlice.actions;
