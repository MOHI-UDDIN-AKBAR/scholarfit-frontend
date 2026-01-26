import { logoutSuccess } from '../../../store/slices/authSlice';
import store from '../../../store/store';
import { tokenService } from './tokenService';

export function logoutAndClearAuth() {
  tokenService.clear();
  store.dispatch(logoutSuccess());
}
