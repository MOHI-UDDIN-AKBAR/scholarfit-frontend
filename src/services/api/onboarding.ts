import type { Onboarding, OnboardingInput } from '../../types/onboarding';
import { axiosInstance } from '../axios/axiosInstance';

export const onboarding = async (onboardingInput: OnboardingInput): Promise<Onboarding> => {
  const { data } = await axiosInstance.post<Onboarding>('/onboarding', onboardingInput);
  return data;
};
