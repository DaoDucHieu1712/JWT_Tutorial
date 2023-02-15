import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: {
    currentUser: null,
    isFetching: false,
    error: "",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = "";
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = action.payload;
    },
    logoutStart: (state) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = "";
    },
    logoutFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = action.payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authSelector = (state) => state.auth;
const authReducer = authSlice.reducer;
export default authReducer;
