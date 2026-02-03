import { useMutation } from '@tanstack/react-query';
import { onboarding } from '../api/onboarding';
import { ONBOARDING_QUERY_KEYS } from '../../utils/constants/queryKeys/onboarding';
import type { ApiErrorResponse } from '../../types/api';
import type { AxiosError } from 'axios';
import type { Onboarding, OnboardingInput } from '../../types/onboarding';
import type { NavigateFunction } from 'react-router';

export const useOnboarding = (navigate: NavigateFunction) =>
  useMutation<Onboarding, AxiosError<ApiErrorResponse>, OnboardingInput>({
    mutationKey: ONBOARDING_QUERY_KEYS.onboarding,
    mutationFn: onboarding,
    onSuccess: () => {
      console.log(`${ONBOARDING_QUERY_KEYS.onboarding} Onboarding successful`);
    },
    onError: (error) => {
      console.error(
        `${ONBOARDING_QUERY_KEYS.onboarding} Failed to do onboarding`,
        error.response?.data?.error?.message ?? error.message
      );
    },
    onSettled: () => {
      navigate('/workouts');
    },
  });
