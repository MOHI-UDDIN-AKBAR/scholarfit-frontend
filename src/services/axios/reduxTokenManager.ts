import store from '../../store/store';
import { setAccessToken, logout } from '../../store/slices/authSlice';

export type TokenManager = {
  getAccessToken: () => string | null;
  setAccessToken: (token: string) => void;
  clearTokens: () => void;
};

export const reduxTokenManager: TokenManager = {
  getAccessToken: () => store.getState().auth.accessToken,
  setAccessToken: (token: string) => store.dispatch(setAccessToken(token)),
  clearTokens: () => store.dispatch(logout()),
};
