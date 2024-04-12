import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from '../index';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authData: null,
  },
  reducers: {
    setAuth(state, action) {
      const user = JSON.parse(localStorage.getItem('profile'));
      if (user) {
        state.authData = user;
      } else {
        return state;
      }
    },
    addAuth(state, action) {
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action.payload };
    },
    logOutAuth(state, action) {
      localStorage.clear();
      return { ...state, authData: null };
    },
  },
  extraReducers(builder) {
    builder.addCase(signIn.fulfilled, (state, action) => {
      if (action.payload.result && action.payload.token) {
        localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
        return { ...state, authData: action.payload };
      } else {
        return state;
      }
    }),
      builder.addCase(signUp.fulfilled, (state, action) => {
        if (action.payload.result && action.payload.token) {
          localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
          return { ...state, authData: action.payload };
        } else {
          return state;
        }
      });
  },
});

export const authReducer = authSlice.reducer;
export const { addAuth, logOutAuth, setAuth } = authSlice.actions;
