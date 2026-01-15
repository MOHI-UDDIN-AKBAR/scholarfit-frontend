import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { UserProfile } from '../../types/auth';

export type AuthState = {
  accessToken: string | null;
  userInfo: UserProfile | null;
};

const initialState: AuthState = {
  accessToken: null,
  userInfo: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{
        accessToken: string;
        user: UserProfile;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.userInfo = action.payload.user;
    },

    logout: (state) => {
      state.accessToken = null;
      state.userInfo = null;
    },

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken, logout, loginSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;
