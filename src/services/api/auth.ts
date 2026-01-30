import type { ApiResponse } from '../../types/api';
import type {
  AuthResponse,
  LoginFormState,
  RegisterFormData,
  AccessToken,
  UserProfile,
} from '../../types/auth';
import { api } from '../axios/axios';

export const register = async (
  registrationData: RegisterFormData
): Promise<{ user: UserProfile }> => {
  const { data } = await api.post<ApiResponse<{ user: UserProfile }>>(
    '/auth/register',
    registrationData
  );

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const login = async (loginData: LoginFormState): Promise<AuthResponse> => {
  const { data } = await api.post<ApiResponse<AuthResponse>>('/auth/login', loginData);

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const refreshAccessToken = async (): Promise<AccessToken> => {
  const { data } = await api.post<ApiResponse<AccessToken>>('/auth/refresh');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const logout = async (): Promise<{ message: string }> => {
  const { data } = await api.post<ApiResponse<{ message: string }>>('/auth/logout');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const { data } = await api.get<ApiResponse<UserProfile>>('/auth/profile');

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};
