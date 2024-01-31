import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  session: null, 
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.session = action.payload?.AuthenticationResult;
      state.user = action.payload?.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.session = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
