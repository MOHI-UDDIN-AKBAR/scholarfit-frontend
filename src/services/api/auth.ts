import type {
  AuthResponse,
  LoginFormState,
  RegisterFormData,
  Tokens,
  UserProfile,
} from '../../types/auth';
import { axiosInstance } from '../axios/axiosInstance';

export const register = async (registrationData: RegisterFormData): Promise<UserProfile> => {
  const { data } = await axiosInstance.post<UserProfile>('/auth/register', registrationData);
  return data;
};

export const login = async (loginData: LoginFormState): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', loginData);
  return data;
};

export const refreshToken = async (token: string): Promise<Tokens> => {
  const { data } = await axiosInstance.post<Tokens>('/auth/refresh', token);
  return data;
};

export const logout = async (token: string): Promise<{ message: string }> => {
  const { data } = await axiosInstance.post<{ message: string }>('/auth/logout', token);
  return data;
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.get<UserProfile>('/auth/logout');
  return data;
};
