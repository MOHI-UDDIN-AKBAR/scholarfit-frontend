import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '../../types/auth';
import { tokenService } from '../../services/axios/auth/tokenService';

export type AuthState = {
  userInfo: UserProfile | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  userInfo: null,
  isAuthenticated: Boolean(tokenService.get()),
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<UserProfile>) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
    },

    logoutSuccess: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

export const { logoutSuccess, loginSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
