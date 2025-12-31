import type {
  AuthResponse,
  LoginFormState,
  RegisterFormData,
  AccessToken,
  UserProfile,
} from '../../types/auth';
import { api } from '../axios/axios';
import type { ApiResponse } from '../types';

export const register = async (
  registrationData: RegisterFormData
): Promise<{ user: UserProfile }> => {
  const {
    data: { data },
  } = await api.post<ApiResponse<{ user: UserProfile }>>('/auth/register', registrationData);
  console.log(data);
  return data;
};

export const login = async (loginData: LoginFormState): Promise<AuthResponse> => {
  const {
    data: { data },
  } = await api.post<ApiResponse<AuthResponse>>('/auth/login', loginData);
  console.log(data);
  return data;
};

export const refreshAccessToken = async (): Promise<AccessToken> => {
  const {
    data: { data },
  } = await api.post<ApiResponse<AccessToken>>('/auth/refresh');
  return data;
};

export const logout = async (): Promise<{ message: string }> => {
  const {
    data: { data },
  } = await api.post<ApiResponse<{ message: string }>>('/auth/logout');
  return data;
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const {
    data: { data },
  } = await api.get<ApiResponse<UserProfile>>('/auth/logout');
  return data;
};
