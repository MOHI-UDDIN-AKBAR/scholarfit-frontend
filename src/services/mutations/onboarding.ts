import { useMutation } from '@tanstack/react-query';
import { onboarding } from '../api/onboarding';

const ONBOARDING_KEYS = {
  onboarding: ['onboarding'] as const,
};

export const useOnboarding = () =>
  useMutation({
    mutationKey: ONBOARDING_KEYS.onboarding,
    mutationFn: onboarding,
    onSuccess: (data) => {
      console.log(`${ONBOARDING_KEYS.onboarding} Onboarding for ${data.userId} successful`);
    },
    onError: (error) => {
      console.error(`${ONBOARDING_KEYS.onboarding} Failed to do onboarding`, error.message);
    },
  });
