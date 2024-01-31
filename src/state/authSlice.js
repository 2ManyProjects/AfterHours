import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  session: null, 
  userData: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.session = action.payload?.AuthenticationResult;
      let AccessToken = action.payload?.AuthenticationResult.AccessToken;
      let encodedData = AccessToken.split(".")[1];
      // console.log(JSON.parse(window.atob(encodedData)))
      state.userData = JSON.parse(window.atob(encodedData));
      state.user = action.payload?.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.session = null;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
