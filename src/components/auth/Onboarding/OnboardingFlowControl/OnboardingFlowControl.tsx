import clsx from 'clsx';
import { useAppDispatch, useAppState } from '../../../../store/hooks';
import Icon from '../../../ui/Icon/Icon';
import {
  nextOnboardingStep,
  previousOnboardingStep,
} from '../../../../store/slices/onboardingSlice';
import Button from '../../../ui/Button/Button';
import { useCallback } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router';
import { useOnboarding } from '../../../../services/mutations/onboarding';
import type { Onboarding } from '../../../../types/onboarding';

const OnboardingFlowControl: React.FC = () => {
  const navigate = useNavigate();
  const { isFirstStep, isLastStep, isReadyToContinue, onboardingData } = useAppState(
    (state) => ({
      isFirstStep: state.onboarding.isFirstStep,
      isLastStep: state.onboarding.isLastStep,
      isReadyToContinue: state.onboarding.isReadyToContinue,
      onboardingData: state.onboarding.onboardingData,
    }),
    shallowEqual
  );

  const dispatch = useAppDispatch();

  const goBack = useCallback(() => dispatch(previousOnboardingStep()), [previousOnboardingStep]);
  const goNext = useCallback(() => dispatch(nextOnboardingStep()), [nextOnboardingStep]);

  const { mutate: mutateOnboarding } = useOnboarding(navigate);
  const handleOnboardingSubmission = () => {
    mutateOnboarding(onboardingData as Onboarding);
  };
  return (
    <div>
      <div className={clsx('flex mt-10', isFirstStep ? 'justify-end' : ' justify-between')}>
        {!isFirstStep && (
          <Button type="button" className="prev-btn" onClick={goBack}>
            <Icon name="arrowLeft" className="mr-2"></Icon>
            Back
          </Button>
        )}
        {!isLastStep && (
          <Button
            type="button"
            className={clsx(
              'next-btn',
              !isReadyToContinue
                ? 'bg-gray-500 hover:cursor-not-allowed!'
                : 'bg-primary-500 hover:bg-primary-600'
            )}
            disabled={!isReadyToContinue}
            onClick={goNext}
          >
            Continue
            <Icon name="arrowRight" className="ml-2"></Icon>
          </Button>
        )}
        {isLastStep && (
          <Button
            type="button"
            onClick={handleOnboardingSubmission}
            className={clsx(
              'complete-btn',
              !isReadyToContinue
                ? 'bg-gray-500 hover:cursor-not-allowed!'
                : 'bg-green-600 hover:bg-green-700'
            )}
            disabled={!isReadyToContinue}
          >
            Complete Setup
            <Icon name="check" className="ml-2"></Icon>
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnboardingFlowControl;
