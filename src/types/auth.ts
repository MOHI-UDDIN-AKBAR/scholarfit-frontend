type FormState = {
  email: string;
  password: string;
};

export type LoginFormState = FormState;

export type RegisterFormState = FormState & {
  name: string;
  confirmPassword: string;
  acceptTerms: 'on' | null;
};

export type RegisterFormData = FormState & {
  name: string;
  confirmPassword: string;
};

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  isEmailVerified: boolean;
  isOnboarded: boolean;
  avatarUrl?: string;
  createdAt: Date;
}

export type AccessToken = {
  accessToken: string;
};
export interface AuthResponse extends AccessToken {
  user: UserProfile;
}
