import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error:false,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = false;
    },
    loginFailure: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess,loginFailure, logout } = userSlice.actions;

export default userSlice.reducer;