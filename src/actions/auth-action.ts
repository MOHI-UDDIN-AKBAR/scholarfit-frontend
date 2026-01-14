import type { UseMutateFunction } from '@tanstack/react-query';
import { INITIAL_LOGIN_FORM_STATE } from '../components/auth/LoginForm/LoginForm';
import { INITIAL_REGISTER_FORM_STATE } from '../components/auth/RegisterForm/RegisterForm';
import type {
  AuthResponse,
  LoginFormState,
  RegisterFormData,
  RegisterFormState,
  UserProfile,
} from '../types/auth';
import {
  validateConfirmPassword,
  validateEmail,
  validateFullName,
  validatePassword,
} from '../utils/helpers/validationUtils';
import type { ValidationResult } from '../utils/types';

export type FormErrors = Record<
  'email' | 'password' | 'name' | 'confirmPassword',
  ValidationResult
>;

export const performLogin = async (
  _: unknown,
  formData: FormData,
  resetForm: React.Dispatch<React.SetStateAction<LoginFormState>>,
  loginMutation: UseMutateFunction<AuthResponse, Error, LoginFormState, unknown>
): Promise<Partial<FormErrors> | void> => {
  const email = (formData.get('email') as string).trim();
  const password = (formData.get('password') as string).trim();
  const emailValidation = validateEmail(email) as ValidationResult;
  const passwordValidation = validatePassword(password) as ValidationResult;

  if (!emailValidation.isValid) {
    return { email: emailValidation };
  }
  if (!passwordValidation.isValid) {
    return { password: passwordValidation };
  }

  loginMutation({ email, password });
  resetForm(INITIAL_LOGIN_FORM_STATE);
};

export const submitRegisterForm = async (
  _: unknown,
  formData: FormData,
  resetForm: React.Dispatch<React.SetStateAction<RegisterFormState>>,
  registerMutation: UseMutateFunction<
    {
      user: UserProfile;
    },
    Error,
    RegisterFormData,
    unknown
  >
): Promise<Partial<FormErrors> | void> => {
  const name = (formData.get('name') as string).trim();
  const email = (formData.get('email') as string).trim();
  const password = (formData.get('password') as string).trim();
  const confirmPassword = (formData.get('confirmPassword') as string).trim();
  const nameValidation = validateFullName(name) as ValidationResult;
  const emailValidation = validateEmail(email) as ValidationResult;
  const passwordValidation = validatePassword(password) as ValidationResult;
  const confirmPasswordValidation = validateConfirmPassword(
    password,
    confirmPassword
  ) as ValidationResult;

  if (!nameValidation.isValid) {
    return { name: nameValidation };
  }
  if (!emailValidation.isValid) {
    return { email: emailValidation };
  }
  if (!passwordValidation.isValid) {
    return { password: passwordValidation };
  }
  if (!confirmPasswordValidation.isValid) {
    return { confirmPassword: confirmPasswordValidation };
  }

  registerMutation({ name, email, password, confirmPassword });
  resetForm(INITIAL_REGISTER_FORM_STATE);
};
