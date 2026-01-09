import type { ApiResponse } from '../../types/api';
import type { Onboarding, OnboardingInput } from '../../types/onboarding';
import { api } from '../axios/axios';

export const onboarding = async (onboardingInput: OnboardingInput): Promise<Onboarding> => {
  const { data } = await api.post<ApiResponse<Onboarding>>('/onboarding', onboardingInput);

  if (!data.success) {
    throw new Error(data.error.message);
  }

  return data.data;
};
